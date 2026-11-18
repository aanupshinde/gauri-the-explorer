<?php
// Contact form mailer for Hostinger (uses PHP mail()). Set the address that should receive messages:
$TO = 'CHANGE-ME@example.com';

header('Content-Type: application/json');
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); echo json_encode(['ok' => false]); exit; }
if (!empty($_POST['website'])) { echo json_encode(['ok' => true]); exit; } // spam honeypot

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
$headers = "From: Website <no-reply@gauritheexplorer.com>\r\nReply-To: $email\r\nContent-Type: text/plain; charset=UTF-8";
$sent = mail($TO, $subject, $body, $headers);
echo json_encode($sent ? ['ok' => true] : ['ok' => false, 'error' => 'Could not send right now. Please try again later.']);
