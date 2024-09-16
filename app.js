let vocabList = JSON.parse(localStorage.getItem('vocabList')) || [];
let wordsVisible = true;
let currentWordIndex = 0;
let selectedWords = [];
let correctAnswers = 0;
let score = 0;
const totalQuizWords = 5;

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
    if (vocabList.length < totalQuizWords) {
        alert('Es gibt nicht genug Wörter, um ein Quiz zu starten!');
        return;
    }

    document.getElementById('quiz-section').style.display = 'block';
    document.getElementById('quiz-feedback').textContent = ''; // Feedback zurücksetzen

    selectedWords = getRandomWords(totalQuizWords); // 5 zufällige Wörter auswählen
    currentWordIndex = 0;
    correctAnswers = 0;
    displayQuizWord();
}

// Zufällig 5 Wörter aus der Vokabelliste auswählen
function getRandomWords(count) {
    const shuffled = [...vocabList].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// Nächstes Wort im Quiz anzeigen
function nextWord() {
    currentWordIndex++;
    if (currentWordIndex < selectedWords.length) {
        displayQuizWord();
        document.getElementById('user-translation').value = ''; // Eingabefeld zurücksetzen
        document.getElementById('quiz-feedback').textContent = ''; // Feedback zurücksetzen
    } else {
        endQuiz(); // Quiz beenden, wenn alle Wörter angezeigt wurden
    }
}

// Quiz-Wort anzeigen
function displayQuizWord() {
    document.getElementById('quiz-word').textContent = selectedWords[currentWordIndex].word;
}

// Übersetzung überprüfen
function checkTranslation() {
    const userTranslation = document.getElementById('user-translation').value.trim();
    const correctTranslation = selectedWords[currentWordIndex].translation;

    const feedbackElement = document.getElementById('quiz-feedback');
    if (userTranslation.toLowerCase() === correctTranslation.toLowerCase()) {
        feedbackElement.textContent = 'Richtig!';
        feedbackElement.style.color = 'green';
        correctAnswers++; // Erhöhe die Anzahl der richtigen Antworten
    } else {
        feedbackElement.textContent = `Falsch! Die richtige Antwort ist: ${correctTranslation}`;
        feedbackElement.style.color = 'red';
    }
}

// Quiz beenden und Punktestand anzeigen
function endQuiz() {
    if (correctAnswers === totalQuizWords) {
        score++; // Einen Punkt hinzufügen, wenn alle Antworten richtig sind
        document.getElementById('quiz-feedback').textContent = `Gratulation! Du hast alle ${totalQuizWords} Wörter richtig.`;
    } else {
        document.getElementById('quiz-feedback').textContent = `Du hast ${correctAnswers} von ${totalQuizWords} richtig beantwortet.`;
    }
    document.getElementById('score').textContent = score; // Aktualisiere den Punktestand
}

// Punktestand zurücksetzen
function resetScore() {
    score = 0;
    document.getElementById('score').textContent = score; // Punktestand auf 0 setzen
}