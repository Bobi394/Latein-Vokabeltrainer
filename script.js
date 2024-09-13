// Array zum Speichern der Vokabeln
let vokabeln = [];

// Funktion zum Hinzufügen einer neuen Vokabel
function addVokabel() {
    const latein = document.getElementById("latein").value;
    const uebersetzung = document.getElementById("uebersetzung").value;

    if (latein && uebersetzung) {
        vokabeln.push({ latein, uebersetzung, hiddenLatein: false, hiddenUebersetzung: false });
        document.getElementById("latein").value = '';
        document.getElementById("uebersetzung").value = '';
        displayVokabeln();
    }
}

// Funktion zur Anzeige der Vokabeln
function displayVokabeln() {
    const vokabelListe = document.getElementById("vokabelListe");
    vokabelListe.innerHTML = ''; // Liste leeren

    vokabeln.forEach((vokabel, index) => {
        const li = document.createElement("li");

        // Lateinisches Wort mit Augen-Button
        const lateinSpan = document.createElement("span");
        lateinSpan.innerText = vokabel.hiddenLatein ? "•••••" : vokabel.latein;
        const lateinButton = document.createElement("button");
        lateinButton.className = "eye-button";

        // Icon für Lateinisches Wort basierend auf dem visibility status
        lateinButton.innerHTML = vokabel.hiddenLatein ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
        lateinButton.onclick = () => toggleLateinVisibility(index);

        // Übersetzung mit Augen-Button
        const uebersetzungSpan = document.createElement("span");
        uebersetzungSpan.innerText = vokabel.hiddenUebersetzung ? "•••••" : vokabel.uebersetzung;
        const uebersetzungButton = document.createElement("button");
        uebersetzungButton.className = "eye-button";

        // Icon für Übersetzung basierend auf dem visibility status
        uebersetzungButton.innerHTML = vokabel.hiddenUebersetzung ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
        uebersetzungButton.onclick = () => toggleUebersetzungVisibility(index);

        // Füge lateinisches Wort und Übersetzung mit Buttons in die Liste ein
        li.appendChild(lateinSpan);
        li.appendChild(lateinButton);
        li.appendChild(document.createTextNode(" - "));
        li.appendChild(uebersetzungSpan);
        li.appendChild(uebersetzungButton);

        // Löschen-Button hinzufügen
        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Löschen";
        deleteButton.onclick = () => deleteVokabel(index);
        li.appendChild(deleteButton);

        vokabelListe.appendChild(li);
    });
}

// Funktion zum Ein- und Ausblenden des lateinischen Worts
function toggleLateinVisibility(index) {
    vokabeln[index].hiddenLatein = !vokabeln[index].hiddenLatein;
    displayVokabeln();
}

// Funktion zum Ein- und Ausblenden der Übersetzung
function toggleUebersetzungVisibility(index) {
    vokabeln[index].hiddenUebersetzung = !vokabeln[index].hiddenUebersetzung;
    displayVokabeln();
}

// Funktion zum Löschen einer Vokabel
function deleteVokabel(index) {
    vokabeln.splice(index, 1);
    displayVokabeln();
}

// Funktion zum Abfragen einer zufälligen Vokabel
function lernen() {
    if (vokabeln.length > 0) {
        const randomIndex = Math.floor(Math.random() * vokabeln.length);
        const vokabel = vokabeln[randomIndex];
        document.getElementById("frage").innerText = vokabel.latein;
        document.getElementById("frage").dataset.index = randomIndex;
        document.getElementById("feedback").innerText = '';

        // Übersetzung ausblenden
        document.getElementById("uebersetzung").style.visibility = 'hidden';
        document.getElementById("uebersetzung").innerText = vokabel.uebersetzung;
        document.getElementById("showTranslationBtn").style.display = 'block'; // Button zum Anzeigen der Übersetzung anzeigen
    }
}

// Funktion zum Anzeigen der Übersetzung
function showTranslation() {
    document.getElementById("uebersetzung").style.visibility = 'visible';
    document.getElementById("showTranslationBtn").style.display = 'none'; // Button ausblenden
}

// Funktion zur Überprüfung der Antwort
function checkAntwort() {
    const index = document.getElementById("frage").dataset.index;
    const antwort = document.getElementById("antwort").value;
    const vokabel = vokabeln[index];

    if (antwort === vokabel.uebersetzung) {
        document.getElementById("feedback").innerText = "Richtig!";
    } else {
        document.getElementById("feedback").innerText = `Falsch! Die richtige Antwort ist: ${vokabel.uebersetzung}`;
    }

    document.getElementById("antwort").value = '';
}
