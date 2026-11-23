<?php
require_once __DIR__ . '/db.php';

header('Content-Type: application/json; charset=utf-8');

$name = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$nachricht = trim($_POST['nachricht'] ?? '');

$fehler = [];

if ($name === '') {
    $fehler['name'] = 'Bitte gib deinen Namen ein.';
} elseif (mb_strlen($name, 'UTF-8') > 100) {
    $fehler['name'] = 'Dein Name darf höchstens 100 Zeichen lang sein.';
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $fehler['email'] = 'Bitte gib eine gültige E-Mail-Adresse ein.';
}

if ($nachricht === '') {
    $fehler['nachricht'] = 'Bitte schreibe eine Nachricht.';
}

if ($fehler) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'fehler' => $fehler]);
    exit;
}

$organisation = trim($_POST['organisation'] ?? '');
$interessen = $_POST['interessen'] ?? [];

try {
    $pdo = verbindeDatenbank();

    $stmt = $pdo->prepare(
        'INSERT INTO sponsoring_anfragen
            (name, email, organisation, interessen, nachricht)
         VALUES
            (:name, :email, :organisation, :interessen, :nachricht)'
    );

    $stmt->execute([
        'name' => $name,
        'email' => $email,
        'organisation' => $organisation === '' ? null : $organisation,
        'interessen' => json_encode($interessen, JSON_THROW_ON_ERROR),
        'nachricht' => $nachricht,
    ]);

    http_response_code(201);
    echo json_encode([
        'ok' => true,
        'meldung' => 'Danke! Deine Anfrage wurde gespeichert.',
        'id' => (int) $pdo->lastInsertId(),
    ]);
} catch (PDOException | JsonException $e) {
    error_log($e->getMessage());

    http_response_code(500);
    echo json_encode([
        'ok' => false,
        'meldung' => 'Die Anfrage konnte nicht gespeichert werden.',
    ]);
}