<?php

/**
 * Derechos de autor por Hector Carrillo ( hector_o_c@hotmail.com )
 * Ultima actualizacion: 30/Ene/2015
 *
 * Autorizado en virtud de la Licencia de Apache, Versión 2.0 (la "Licencia");
 * se prohíbe utilizar este archivo excepto en cumplimiento de la Licencia.
 * Podrá obtener una copia de la Licencia en:
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * A menos que lo exijan las leyes pertinentes o se haya establecido por escrito,
 * el software distribuido en virtud de la Licencia se distribuye “TAL CUAL”, SIN
 * GARANTÍAS NI CONDICIONES DE NINGÚN TIPO, ya sean expresas o implícitas. Véase
 * la Licencia para consultar el texto específico relativo a los permisos y
 * limitaciones establecidos en la Licencia.
 */

namespace HCStudio;

use MySQLi;
use Exception;
use RecursiveIteratorIterator;
use RecursiveArrayIterator;

class Connection
{
	private static $connections = [];
	private static $instances = [];
    private ?MySQLi $mysqli = null;
	private ?string $connection = null;
	
	private ?string $protocol = null;
	private ?string $project_url = null;
	private ?string $project_name = null;

	public function getConnectioName() : ?string {
		return $this->connection;
	}

	public static function getMainPath(): string {	
		return $_ENV['PROJECT_PROTOCOL'] . "://" . $_ENV['PROJECT_URL'];
	}

	public function getProjectProtocol(): string {
		return $_ENV['PROJECT_PROTOCOL'];
	}

	public function getProjectURL(): string {
		return $_ENV['PROJECT_URL'];
	}

	public function getProjectName(): string {
		return $_ENV['PROJECT_NAME'];
	}

	public static function getInstance(?string $connection = null) : self
	{
		if(!array_key_exists($connection, self::$instances)){
			self::$instances[$connection] = new self($connection);
		}
		
		return self::$instances[$connection];
	}

	public function __construct(?string $connection = null)
	{
		$this->protocol = $_ENV['PROJECT_PROTOCOL'] ?? $this->protocol;
		$this->project_url = $_ENV['PROJECT_URL'] ?? $this->project_url;
		$this->project_url .= substr($this->project_url, -1) !== '/' ? '/' : '';
		$this->project_name = $_ENV['PROJECT_NAME'] ?? $this->project_name;

		$this->setConnection($connection);
	}

	public function setConnection(?string $connection = null) : void
	{
		$mysqlSettings = [$_ENV['MYSQL_HOSTNAME'], $_ENV['MYSQL_ROOT_USER'], $_ENV['MYSQL_ROOT_PASSWORD']];
		$connections = [
			'default' => [...$mysqlSettings, $_ENV['DEFAULT_DB'] ?? 'apps_dummytrader'],
			'world' => [...$mysqlSettings, $_ENV['WORLD_DB'] ?? 'app_worlds'],
			'blockchain' => [...$mysqlSettings, $_ENV['BLOCKCHAIN_DB'] ?? 'app_blockchain']
		];

		$connection = $connection ?? 'default';

		if (!isset($connections[$connection])) {
			throw new Exception('Conexion no localizada');
		}
		
		if (!isset(self::$connections[$connection])) {
            [$host, $user, $pass, $db] = $connections[$connection];

			$mysqli = new MySQLi($host, $user, $pass, $db);
			if ($mysqli->connect_error) {
                throw new Exception("Connection failed: " . $mysqli->connect_error);
            }
            $mysqli->set_charset('utf8');
			
            self::$connections[$connection] = $mysqli;
		}
		
		$this->mysqli = self::$connections[$connection];
		$this->connection = $connection;
	}

	public function __get(string $attribute)
    {
        return $this->mysqli->$attribute;
    }

    public function __call(string $method, array $arguments)
    {
        return call_user_func_array([$this->mysqli, $method], $arguments);
    }

    private function __clone() { }

    private function getType($item = null): string
    {
        return match (gettype($item)) {
            'string' => 's',
            'boolean' => '',
            'integer' => 'i',
            'blob' => 'b',
            'double' => 'd',
            default => 's'
        };
    }

    public function stmtQuery(string $query, $bindParams = null)
    {
        $stmt = $this->mysqli->prepare($query);
        if (!$stmt) {
            throw new Exception($this->mysqli->error);
        }

        if (isset($bindParams) && !empty($bindParams)) {
            if (!is_array($bindParams)) {
                $bindParams = [$bindParams];
            }

            $refParams = ['_types_' => ''];
            foreach ($bindParams as $key => &$param) {
                $refParams['_types_'] .= $this->getType($param);
                $refParams[$key] = &$param;
            }

            $stmt->bind_param(...array_values($refParams));
        }

        $stmt->execute();

        if ($stmt->errno) {
            throw new Exception($stmt->error);
        }

        if ($stmt->affected_rows > -1) {
            return true;
        }

        $results = [];
        $metadata = $stmt->result_metadata();
        if ($metadata) {
            while ($field = $metadata->fetch_field()) {
                $row[$field->name] = &$row[$field->name];
            }

            $tmp = [];
            foreach ($row as $key => $value) {
                $tmp[$key] = &$row[$key];
            }

            $stmt->bind_result(...array_values($tmp));

            while ($stmt->fetch()) {
                $results[] = unserialize(serialize($row));
            }
        }

        $stmt->close();

        return empty($results) ? false : $results;
    }

    public function rows(string $query, $bindParams = null)
    {
        return $this->stmtQuery($query, $bindParams);
    }

    public function row(string $query, $bindParams = null)
    {
        $result = $this->stmtQuery($query, $bindParams);
        return $result ? current($result) : false;
    }

    public function field(string $query, $bindParams = null)
    {
        $result = $this->row($query, $bindParams);
        return $result ? current($result) : false;
    }

    public function column(string $query, $bindParams = null)
    {
        $result = $this->rows($query, $bindParams);
        if ($result) {
            $iterator = new RecursiveIteratorIterator(new RecursiveArrayIterator($result));
            return iterator_to_array($iterator, false);
        }
        return false;
    }

    public function insert(string $table, array $fields)
    {
        $columns = implode(', ', array_keys($fields));
        $values = implode(',', array_fill(0, count($fields), '?'));
        $query = "INSERT INTO {$table}($columns) VALUES ($values)";
        $result = $this->stmtQuery($query, $fields);
        return $result ? $this->insert_id : false;
    }
}