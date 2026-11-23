# Testprotokoll Sponsoring-Formular

Getestet am 23.11.2026 mit Chrome.
Ansichten: Desktop und 375 px. Schmale Ansicht zusätzlich geprüft.

| Nr. | Testfall | Erwartung | Ergebnis | Status |
|---|---|---|---|---|
| 1 | Alle Felder im Browser leer absenden | Drei Fehler, markierte Felder, kein Request | Fehler erscheinen, Network bleibt leer | ✓ |
| 2 | Name leer, übrige Pflichtfelder gültig | Nur Namensfehler | Passende Meldung erscheint | ✓ |
| 3 | Nachricht leer, übrige Pflichtfelder gültig | Nur Nachrichtenfehler | Nachrichtenfeld wird markiert | ✓ |
| 4 | E-Mail lea@ im Browser | E-Mail wird abgelehnt | E-Mail-Feld wird markiert | ✓ |
| 5 | Leere Anfrage mit curl | PHP lehnt alle drei Pflichtfelder ab | ok: false und drei Fehlermeldungen | ✓ |
| 6 | E-Mail a@b mit curl | PHP lehnt die Adresse ab | Passender E-Mail-Fehler | ✓ |
| 7 | Name mit 101 Zeichen mit curl | PHP lehnt den Namen ab | Meldung zur Grenze von 100 Zeichen | ✓ |
| 8 | Datenbank nach Fehlversuchen zählen | Anzahl bleibt gleich | Vorher 5, nachher 5 Datensätze | ✓ |
| 9 | Leer absenden bei 375 px | Fehlerliste wird sichtbar, Felder werden markiert | Liste und Markierungen sichtbar | ✓ |
| 10 | Zoë Müller-Lüdenscheidt und O'Brien speichern | Zeichen bleiben erhalten | In SQLite korrekt angezeigt | ✓ |
| 11 | Çelik, Emoji und <b>fett</b> speichern | Zeichen und Text bleiben erhalten | In SQLite angezeigt | ✓ |
| 12 | E-Mail jürg@bärn.ch | Adresse wird abgelehnt | Passende Fehlermeldung | ✓ |
| 13 | Gültige Anfrage senden | Grüne Meldung, Formular leer, Button zurückgesetzt | Grüne Meldung und ursprünglicher Buttontext sichtbar | ✓ |
| 14 | Ayşe mit ş speichern | Zeichen bleibt genau erhalten | Ayşe in SQLite korrekt angezeigt | ✓ |
| 15 | Formular ausschliesslich per Tastatur bedienen | Alle Felder erreichbar, Fokus sichtbar, Absenden möglich | Mit Tastatur erfolgreich abgeschickt, Fokus sichtbar | ✓ |
| 16 | Ganze Seite bei 320 px prüfen | Alles erreichbar, kein seitliches Scrollen | Alle Inhalte passen, kein seitliches Scrollen nötig | ✓ |
| 17 | Zustand während der Übertragung | Button deaktiviert und zeigt Wird gesendet … | Bei 3G geprüft, danach wieder aktiv und zurückgesetzt | ✓ |

## Gefundene Fehler und Verbesserungen

- Leere Eingaben wurden zunächst an PHP gesendet.
  Browser-Prüfung ergänzt. Erneuter Test erfolgreich.
- Fehler standen zusammen in einem langen Satz.
  Fehlerliste und automatisches Scrollen ergänzt.
  Bei 375 px erneut geprüft.
- PHP konnte mb_strlen zunächst nicht verwenden.
  mbstring in php.ini aktiviert. Funktionsprüfung erfolgreich.
- Beim Einfügen entstand ein doppelter finally-Block.
  Auf einen Block korrigiert. Erfolgreiches Absenden erneut geprüft.
- Der Pflichtfeldhinweis stand zunächst im Namensfeldbereich.
  Direkt an den Anfang des Formulars verschoben.
