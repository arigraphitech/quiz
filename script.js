let currentQuestionIndex = 0; // Index de la question en cours
let questions = []; // Tableau pour stocker les questions chargées

// Fonction pour charger le JSON
async function loadQuestions() {
  try {
    const response = await fetch('questions.json'); // Charge le fichier JSON
    if (!response.ok) {
      throw new Error('Erreur lors du chargement du fichier JSON');
    }
    questions = await response.json(); // Stocke les questions dans la variable globale
    showQuestion(); // Affiche la première question
  } catch (error) {
    console.error('Erreur :', error);
  }
}

// Fonction pour afficher une question
function showQuestion() {
  const quizContainer = document.getElementById('quiz-container');
  quizContainer.innerHTML = ""; // Vide le conteneur

  if (currentQuestionIndex >= questions.length) {
    // Si toutes les questions sont terminées
    quizContainer.innerHTML = "<h2>Quiz terminé ! 🎉</h2>";
    return;
  }

  const question = questions[currentQuestionIndex]; // Question actuelle

  const questionDiv = document.createElement('div');
  questionDiv.classList.add('question');

  const questionTitle = document.createElement('h2');
  questionTitle.textContent = `${currentQuestionIndex + 1}. ${question.question}`;
  questionDiv.appendChild(questionTitle);

  const choicesDiv = document.createElement('div');
  choicesDiv.classList.add('choices');

  Object.entries(question.choices).forEach(([key, choice]) => {
    const button = document.createElement('button');
    button.textContent = `${key}) ${choice}`;
    button.onclick = () =>
      checkAnswer(key, button, choicesDiv, question.correctAnswer, question.explanation);
    choicesDiv.appendChild(button);
  });

  questionDiv.appendChild(choicesDiv);

  const feedbackDiv = document.createElement('div');
  feedbackDiv.classList.add('feedback');
  questionDiv.appendChild(feedbackDiv);

  quizContainer.appendChild(questionDiv);
}

// Fonction pour vérifier les réponses
function checkAnswer(selectedAnswer, button, choicesDiv, correctAnswer, explanation) {
  const feedback = choicesDiv.nextElementSibling;

  // Désactive tous les boutons de réponse
  choicesDiv.querySelectorAll('button').forEach((btn) => {
    btn.disabled = true;
  });

  // Affiche le feedback
  if (selectedAnswer === correctAnswer) {
    feedback.textContent = "Bonne réponse ! 🎉 " + explanation;
    feedback.style.color = "green";
  } else {
    feedback.textContent = `Mauvaise réponse. La bonne réponse était ${correctAnswer}. ${explanation}`;
    feedback.style.color = "red";
  }

  // Ajoute le bouton "Suivant" après avoir répondu
  const nextButton = document.createElement('button');
  nextButton.textContent = "Suivant";
  nextButton.onclick = () => {
    currentQuestionIndex++; // Passe à la question suivante
    showQuestion(); // Affiche la nouvelle question
  };
  feedback.appendChild(nextButton);
}

// Charger les questions au démarrage
loadQuestions();
