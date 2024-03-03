<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";
require_once TO_ROOT. "/vendor/autoload.php";

$mailbox = '{imap.dreamhost.com:993/imap/ssl/novalidate-cert}';

$hostname = 'imap.dreamhost.com';
$port = 993;
$username = 'javier@zuppi.io';
$password = '@Angela1993';

$server = new Ddeboer\Imap\Server($hostname);
$connection = $server->authenticate($username, $password);

$mailbox = $connection->getMailbox('INBOX');
$messages = $mailbox->getMessages();

foreach ($messages as $message) {
    var_dump($message->getSubject());
    var_dump($message->getBodyHtml());
    var_dump($message->getBodyText());
}