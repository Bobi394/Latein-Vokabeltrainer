// Array zum Speichern der Vokabeln
let vokabeln = [];

// Funktion zum Hinzufügen einer neuen Vokabel
function addVokabel() {
    const latein = document.getElementById("latein").value;
    const uebersetzung = document.getElementById("uebersetzung").value;

    if (latein && uebersetzung) {
        vokabeln.push({ latein, uebersetzung });
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
        li.innerHTML = `${vokabel.latein} - ${vokabel.uebersetzung} <button onclick="deleteVokabel(${index})">Löschen</button>`;
        vokabelListe.appendChild(li);
    });
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
    }
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
