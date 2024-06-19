"use strict";

const questions = [
    {
        question: "How many planets are in the solar system?",
        answers: [8, 9, 10],
        correct: 8
    },
    {
        question: "What is the freezing point of water?",
        answers: [0, -5, -6],
        correct: 0
    },
    {
        question: "What is the longest river in the world?",
        answers: ["Nile", "Amazon", "Yangtze"],
        correct: "Nile"
    },
    {
        question: "How many chromosomes are in the human genome?",
        answers: [42, 44, 46],
        correct: 46
    },
    {
        question: "Which of these characters are friends with Harry Potter?",
        answers: ["Ron Weasley", "Draco Malfoy", "Hermione Granger"],
        correct: ["Ron Weasley", "Hermione Granger"]
    },
    {
        question: "What is the capital of Canada?",
        answers: ["Toronto", "Ottawa", "Vancouver"],
        correct: "Ottawa"
    },
    {
        question: "What is the Jewish New Year called?",
        answers: ["Hanukkah", "Yom Kippur", "Kwanzaa"],
        correct: "Hanukkah"
    }
];

let currentQuestionIndex = 0;

const questionTitle = document.querySelector('.question__title p');
const questionText = document.querySelector('.question__text p');
const answerList = document.querySelector('.answer-list');
const answerButton = document.querySelector('.answer-button');


function showQuestion() {
    const question = questions[currentQuestionIndex];
    questionTitle.textContent = `Question: ${currentQuestionIndex + 1}`;
    questionText.textContent = question.question;
    answerList.innerHTML = '';
    question.answers.forEach(function (item) {
        const li = document.createElement('li');
        const button = document.createElement('button');
        button.classList.add('answer');

        if (typeof item === 'number' || typeof item === 'string') {
            button.textContent = String(item);
        }

        button.addEventListener('click', () => {
            checkAnswerClick(button, question.correct);
        });

        li.append(button);
        answerList.append(li);
    });
}
answerButton.addEventListener('click', () => {
    currentQuestionIndex++;
    showQuestion();

});

function checkAnswerClick(button, correctAnswer) {
    const buttons = document.querySelectorAll('.answer');
    buttons.forEach(item => {
        item.disabled = true;
        if (item.textContent === correctAnswer.toString()) {
            item.classList.add('correct-answer');
        }
    });

    if (button.textContent === correctAnswer.toString()) {
    } else {
        button.classList.add('wrong-answer');
    }

    answerButton.disabled = false;
}

showQuestion();


