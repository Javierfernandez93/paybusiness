<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";
require_once TO_ROOT. "/vendor/autoload.php";

$hostname = 'cp7112.webempresa.eu';
$username = 'irene.quintero@emparejandotusfinanzas.com';
$password = 'Irene.quintero500';

$username = 'administracion@emparejandotusfinanzas.com';
$password = 'eTF*2023';

$server = new Ddeboer\Imap\Server($hostname);
$connection = $server->authenticate($username, $password);

$mailbox = $connection->getMailbox('INBOX');

$today = new DateTimeImmutable();
$thirtyDaysAgo = $today->sub(new DateInterval('P1D'));

$messages = $mailbox->getMessages(
    new Ddeboer\Imap\Search\Date\Since($thirtyDaysAgo),
    \SORTDATE, // Sort criteria
    true // Descending order
);

foreach ($messages as $message) {
    var_dump($message->getSubject());
    var_dump($message->getBodyHtml());
    var_dump($message->getBodyText());
}