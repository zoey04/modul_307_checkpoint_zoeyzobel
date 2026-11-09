CREATE TABLE IF NOT EXISTS sponsoring_anfragen (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    organisation TEXT,
    -- PHP speichert die ausgewählten Checkboxen als JSON-Liste.
    interessen TEXT NOT NULL DEFAULT '[]',
    nachricht TEXT NOT NULL
);