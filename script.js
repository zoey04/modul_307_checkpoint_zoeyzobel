const form = document.querySelector(".sponsoring-form");
const erfolg = document.getElementById("formular-erfolg");
const fehler = document.getElementById("formular-fehler");
const button = form.querySelector('[type="submit"]');

form.noValidate = true;

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  erfolg.textContent = "";
  fehler.textContent = "";
  form.querySelectorAll('[aria-invalid="true"]').forEach((feld) => {
    feld.removeAttribute("aria-invalid");
  });

  button.disabled = true;

  try {
    const antwort = await fetch("anfrage.php", {
      method: "POST",
      body: new FormData(form),
    });
    const daten = await antwort.json();

    if (antwort.ok && daten.ok) {
      form.reset();
      erfolg.textContent = daten.meldung;
      return;
    }

    const feldfehler = daten.fehler ?? {};
    for (const name of Object.keys(feldfehler)) {
      form.elements.namedItem(name)?.setAttribute("aria-invalid", "true");
    }

    fehler.textContent =
      Object.values(feldfehler).join(" ") ||
      daten.meldung ||
      "Die Anfrage konnte nicht gespeichert werden.";
  } catch {
    fehler.textContent = "Keine Verbindung zum Server. Bitte versuch es erneut.";
  } finally {
    button.disabled = false;
  }
});