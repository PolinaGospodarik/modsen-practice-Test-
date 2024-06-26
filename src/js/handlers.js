"use strict";

import { questions } from "./config.js";
import { getCurrentQuestionIndex, incrementScore } from './main.js';

const answerButton = document.querySelector('.answer-button');
const nextButton = document.querySelector('.next-button');

answerButton.addEventListener('click', () => {
    const question = questions[getCurrentQuestionIndex()];
    const buttons = document.querySelectorAll('.answer');
    const selectedAnswers = [];

    buttons.forEach(item => {
        if (item.classList.contains('active')) {
            selectedAnswers.push(item.textContent);
        }
    });

    let allCorrect = true;
    selectedAnswers.forEach(answer => {
        if (!question.correct.includes(answer)) {
            allCorrect = false;
        }
    });

    buttons.forEach(item => {
        item.classList.remove('correct-answer', 'wrong-answer');
        if (question.correct.includes(item.textContent)) {
            item.classList.remove('active');
            item.classList.add('correct-answer');
        } else if (item.classList.contains('active')) {
            item.classList.remove('active');
            item.classList.add('wrong-answer');
        }
        item.disabled = true;
    });

    if (selectedAnswers.length === question.correct.length && allCorrect) {
        incrementScore();
    }

    nextButton.disabled = false;
    answerButton.disabled = true;
});

export function handleAnswerClick(button, correctAnswer) {
    const buttons = document.querySelectorAll('.answer');
    const selectedAnswers = [];

    buttons.forEach(item => {
        if (item.classList.contains('active')) {
            selectedAnswers.push(item.textContent);
        }
    });

    const isActive = button.classList.contains('active');
    const isSingleAnswer = correctAnswer.length === 1;

    if (isActive) {
        button.classList.remove('active');
    } else if (isSingleAnswer) {
        buttons.forEach(item => item.classList.remove('active'));
        button.classList.add('active');
    } else {
        button.classList.add('active');
    }

    selectedAnswers.length = 0;
    buttons.forEach(item => {
        if (item.classList.contains('active')) {
            selectedAnswers.push(item);
        }
    });

    answerButton.disabled = selectedAnswers.length <= 0;
}
