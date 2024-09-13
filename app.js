// Wörter aus dem localStorage laden oder leere Liste initialisieren
let vocabList = JSON.parse(localStorage.getItem('vocabList')) || [];
let wordsVisible = true;
let currentWordIndex = 0;

// Vokabeln bei Seitenaufruf anzeigen
window.onload = displayWords;

// Wort hinzufügen
function addWord() {
    const wordInput = document.getElementById('latin-word');
    const translationInput = document.getElementById('translation');
    const word = wordInput.value.trim();
    const translation = translationInput.value.trim();
    
    if (word && translation) {
        vocabList.push({ word: word, translation: translation });
        localStorage.setItem('vocabList', JSON.stringify(vocabList));
        wordInput.value = '';
        translationInput.value = '';
        displayWords();
    }
}

// Wörter anzeigen
function displayWords() {
    const vocabListElement = document.getElementById('vocab-list');
    vocabListElement.innerHTML = '';

    vocabList.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${item.word} - ${item.translation}`;

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

// Quiz starten
function startQuiz() {
    if (vocabList.length === 0) {
        alert('Keine Vokabeln vorhanden!');
        return;
    }
    document.getElementById('quiz-section').style.display = 'block';
    currentWordIndex = 0;
    displayQuizWord();
    document.getElementById('quiz-feedback').textContent = ''; // Reset feedback
}

// Nächstes Wort im Quiz anzeigen
function nextWord() {
    currentWordIndex = (currentWordIndex + 1) % vocabList.length;
    displayQuizWord();
    document.getElementById('user-translation').value = ''; // Reset input
    document.getElementById('quiz-feedback').textContent = ''; // Reset feedback
}

// Quiz-Wort und -Übersetzung anzeigen
function displayQuizWord() {
    document.getElementById('quiz-word').textContent = vocabList[currentWordIndex].word;
}

// Übersetzung überprüfen
function checkTranslation() {
    const userTranslation = document.getElementById('user-translation').value.trim();
    const correctTranslation = vocabList[currentWordIndex].translation;

    const feedbackElement = document.getElementById('quiz-feedback');
    if (userTranslation.toLowerCase() === correctTranslation.toLowerCase()) {
        feedbackElement.textContent = 'Richtig!';
        feedbackElement.style.color = 'green';
    } else {
        feedbackElement.textContent = `Falsch! Die richtige Antwort ist: ${correctTranslation}`;
        feedbackElement.style.color = 'red';
    }
}