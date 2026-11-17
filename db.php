<?php

function verbindeDatenbank(): PDO
{
    $pdo = new PDO('sqlite:' . __DIR__ . '/Sponsoren & Partner.db');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    $pdo->exec('PRAGMA foreign_keys = ON');

    return $pdo;
}