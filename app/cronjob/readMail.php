<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$mailbox = '{imap.dreamhost.com:993/imap/ssl}';
$username = 'javier@zuppi.io';
$password = '@Angela1993';

$imap = imap_open("{$mailbox}INBOX", $username, $password, OP_HALFOPEN) or die('Cannot connect to email: ' . imap_last_error());
$result = imap_check($imap);

// Retrieve the incoming mail
$messages = imap_search($imap, 'ALL'); 

d($messages);

// Process each incoming message
foreach ($messages as $message) {
    // Get the message header
    $header = imap_headerinfo($imap, $message);

    // Get the sender's email address
    $sender = $header->from[0]->mailbox . '@' . $header->from[0]->host;

    // Get the recipient's email address
    $recipient = $header->to[0]->mailbox . '@' . $header->to[0]->host;

    // Get the subject of the message
    $subject = $header->subject;

    // Get the body of the message
    $body = imap_fetchbody($imap, $message, 1);

    // Process the message
    

    echo $subject;
}

// Close the connection to the mail server
imap_close($imap);

$mbox = imap_open($mailbox, $username, $password, OP_HALFOPEN)
      or die("can't connect: " . imap_last_error());

$list = imap_getmailboxes($mbox, $mailbox, "*");
if (is_array($list)) {
    foreach ($list as $key => $val) {
        echo "($key) ";
        echo imap_utf7_decode($val->name) . ",";
        echo "'" . $val->delimiter . "',";
        echo $val->attributes . "<br />\n";
    }
} else {
    echo "imap_getmailboxes failed: " . imap_last_error() . "\n";
}

imap_close($mbox);