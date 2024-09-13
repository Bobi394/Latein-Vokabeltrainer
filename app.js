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
}

// Nächstes Wort im Quiz anzeigen
function nextWord() {
    currentWordIndex = (currentWordIndex + 1) % vocabList.length;
    displayQuizWord();
}

// Quiz-Wort und -Übersetzung anzeigen
function displayQuizWord() {
    document.getElementById('quiz-word').textContent = vocabList[currentWordIndex].word;
    document.getElementById('quiz-translation').textContent = vocabList[currentWordIndex].translation;
    document.getElementById('quiz-translation').classList.add('hidden');
}

// Übersetzung anzeigen
function showTranslation() {
    document.getElementById('quiz-translation').classList.remove('hidden');
}
