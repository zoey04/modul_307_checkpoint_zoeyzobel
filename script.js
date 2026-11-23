const form = document.querySelector(".sponsoring-form");
const erfolg = document.getElementById("formular-erfolg");
const fehler = document.getElementById("formular-fehler");
const button = form.querySelector('[type="submit"]');

form.noValidate = true;

function pruefeImBrowser() {
  const feldfehler = {};
  const name = form.elements.namedItem("name");
  const email = form.elements.namedItem("email");
  const nachricht = form.elements.namedItem("nachricht");

  if (name.value.trim() === "") {
    feldfehler.name = "Bitte gib deinen Namen ein.";
  } else if ([...name.value.trim()].length > 100) {
    feldfehler.name = "Dein Name darf höchstens 100 Zeichen lang sein.";
  }

  if (!email.checkValidity()) {
    feldfehler.email = "Bitte gib eine gültige E-Mail-Adresse ein.";
  }

  if (nachricht.value.trim() === "") {
    feldfehler.nachricht = "Bitte schreibe eine Nachricht.";
  }

  return feldfehler;
}
function zeigeFehler(feldfehler) {
  fehler.textContent = "Bitte prüfe deine Angaben:";

  const liste = document.createElement("ul");

  for (const [name, text] of Object.entries(feldfehler)) {
    const punkt = document.createElement("li");
    punkt.textContent = text;
    liste.append(punkt);

    form.elements.namedItem(name)?.setAttribute("aria-invalid", "true");
  }

  fehler.append(liste);
  fehler.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  erfolg.textContent = "";
  fehler.textContent = "";
  form.querySelectorAll('[aria-invalid="true"]').forEach((feld) => {
    feld.removeAttribute("aria-invalid");
  });

const fehlerBrowser = pruefeImBrowser();
if (Object.keys(fehlerBrowser).length > 0) {
  zeigeFehler(fehlerBrowser);
  return;
}

  button.disabled = true;

  button.textContent = "Wird gesendet …";

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

if (daten.fehler) {
  zeigeFehler(daten.fehler);
} else {
  fehler.textContent =
    daten.meldung || "Die Anfrage konnte nicht gespeichert werden.";
}

   } catch {
    fehler.textContent = "Keine Verbindung zum Server. Bitte versuch es erneut.";
  } finally {
    button.disabled = false;
    button.textContent = "Anfrage senden";
  }
});