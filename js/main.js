"use strict";

import { questions } from "./config.js";
import { handleAnswerClick } from "./handlers.js";

let currentQuestionIndex = 0;
let score = 0;

const questionTitle = document.querySelector('.question__title p');
const questionText = document.querySelector('.question__text p');
const messageContainer = document.querySelector('.question__message');
const answerList = document.querySelector('.answer-list');
const answerButton = document.querySelector('.answer-button');
const nextButton = document.querySelector('.next-button');
const restartButton = document.querySelector('.restart-button');

export function getCurrentQuestionIndex() {
    return currentQuestionIndex;
}

export function incrementQuestionIndex() {
    currentQuestionIndex++;
}

export function resetQuiz() {
    currentQuestionIndex = 0;
    score = 0;
}

export function incrementScore() {
    score++;
}

export function showQuestion() {
    const question = questions[currentQuestionIndex];
    questionTitle.textContent = `Question: ${currentQuestionIndex + 1}/${questions.length}`;
    questionText.textContent = question.question;
    answerList.innerHTML = '';
    answerButton.disabled = true;
    nextButton.disabled = true;

    question.answers.forEach(function (item) {
        const li = document.createElement('li');
        const button = document.createElement('button');
        button.classList.add('answer');
        button.textContent = String(item);

        button.addEventListener('click', () => {
            handleAnswerClick(button, question.correct);
        });

        li.append(button);
        answerList.append(li);

        if (question.correct.length > 1) {
            if (messageContainer.classList.contains('hidden')) {
                messageContainer.classList.remove('hidden');
                messageContainer.classList.add('visible');
            }
        }else{
            messageContainer.classList.remove('visible');
            messageContainer.classList.add('hidden');
        }
    });
}

function showScore() {
    questionTitle.textContent = 'Quiz Completed!';
    questionText.textContent = `You scored ${score} out of ${questions.length}`;
    answerList.innerHTML = '';
    nextButton.disabled = true;
    answerButton.disabled = true;
}

nextButton.addEventListener('click', () => {
    incrementQuestionIndex();
    if (getCurrentQuestionIndex() < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
});

restartButton.addEventListener('click', () => {
    resetQuiz();
    showQuestion();
});

showQuestion();
