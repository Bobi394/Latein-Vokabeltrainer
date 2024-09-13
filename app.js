// Wörter aus dem localStorage laden oder leere Liste initialisieren
let vocabList = JSON.parse(localStorage.getItem('vocabList')) || [];
let wordsVisible = true;

// Vokabeln bei Seitenaufruf anzeigen
window.onload = displayWords;

// Wort hinzufügen
function addWord() {
    const wordInput = document.getElementById('latin-word');
    const word = wordInput.value.trim();
    
    if (word) {
        vocabList.push(word);
        localStorage.setItem('vocabList', JSON.stringify(vocabList));
        wordInput.value = '';
        displayWords();
    }
}

// Wörter anzeigen
function displayWords() {
    const vocabListElement = document.getElementById('vocab-list');
    vocabListElement.innerHTML = '';

    vocabList.forEach((word, index) => {
        const li = document.createElement('li');
        li.textContent = word;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Löschen';
        deleteButton.onclick = function() {
            deleteWord(index);
        };

        li.appendChild(deleteButton);
        vocabListElement.appendChild(li);
    });
}

// Wort löschen
function deleteWord(index) {
    vocabList.splice(index, 1);
    localStorage.setItem('vocabList', JSON.stringify(vocabList));
    displayWords();
}

// Alle Wörter aus-/einblenden
function toggleWords() {
    const vocabListElement = document.getElementById('vocab-list');
    wordsVisible = !wordsVisible;
    vocabListElement.className = wordsVisible ? '' : 'hidden';
}
