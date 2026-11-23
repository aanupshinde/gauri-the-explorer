<?php
// Contact form mailer for Hostinger (uses PHP mail()).
// The receiving address lives in contact-email.txt next to this file. That file is NOT in GitHub,
// so Git deploys never overwrite it. Create it once in Hostinger File Manager with just the email inside.
$cfg = __DIR__ . '/contact-email.txt';
$TO = is_readable($cfg) ? trim(file_get_contents($cfg)) : '';
// Sender: must be a REAL mailbox created in hPanel → Emails, or Hostinger/Gmail silently drop the message.
// Default contact@gauritheexplorer.com; to use another mailbox put its address in contact-from.txt.
$fromCfg = __DIR__ . '/contact-from.txt';
$FROM = is_readable($fromCfg) ? trim(file_get_contents($fromCfg)) : 'contact@gauritheexplorer.com';
if (!filter_var($FROM, FILTER_VALIDATE_EMAIL)) $FROM = 'contact@gauritheexplorer.com';

header('Content-Type: application/json');
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); echo json_encode(['ok' => false]); exit; }
if (!empty($_POST['website'])) { echo json_encode(['ok' => true]); exit; } // spam honeypot
if (!filter_var($TO, FILTER_VALIDATE_EMAIL)) { echo json_encode(['ok' => false, 'error' => 'The contact form is not set up yet. Please try again later.']); exit; }

$name = trim(strip_tags($_POST['name'] ?? ''));
$email = filter_var(trim($_POST['email'] ?? ''), FILTER_VALIDATE_EMAIL);
$topic = trim(strip_tags($_POST['topic'] ?? ''));
$message = trim(strip_tags($_POST['message'] ?? ''));
if (!$name || !$email || !$message || strlen($message) > 5000) {
  echo json_encode(['ok' => false, 'error' => 'Please fill in your name, a valid email and a message.']); exit;
}
$name = str_replace(["\r", "\n"], ' ', $name);
$subject = '=?UTF-8?B?' . base64_encode("Gauri the Explorer: $topic — $name") . '?=';
$body = "Name: $name\nEmail: $email\nTopic: $topic\n\n$message\n";
$headers = "From: Gauri The Explorer website <$FROM>\r\nReply-To: $email\r\nMIME-Version: 1.0\r\nContent-Type: text/plain; charset=UTF-8";
// -f sets the envelope sender to the same real mailbox, which Hostinger requires for delivery.
$sent = mail($TO, $subject, $body, $headers, '-f' . $FROM);
echo json_encode($sent ? ['ok' => true] : ['ok' => false, 'error' => 'Could not send right now. Please try again later.']);
