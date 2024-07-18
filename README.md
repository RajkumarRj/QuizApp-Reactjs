# Current Affairs Quiz App

Hosted Link - https://tourmaline-cupcake-2331ab.netlify.app/

This is a React-based quiz application that tests users on current affairs. The app features a dynamic question set, score tracking, and a review of incorrect answers.

## Features

- Randomized quiz questions from a JSON file
- Score tracking
- Immediate feedback on correct/incorrect answers
- Review of wrong answers at the end of the quiz
- Option to reset and retake the quiz with shuffled questions

## Usage

1. The app will present a series of multiple-choice questions.
2. Click on an answer to select it.
3. The app will show if the answer is correct (green) or incorrect (red) for 2 seconds before moving to the next question.
4. After answering all questions, you'll see your final score and a list of any questions you answered incorrectly.
5. Click the "Reset" button to start a new quiz with shuffled questions.

## Customization

To add or modify quiz questions, edit the `quiz.json` file in the `src` directory. Each question should follow this format:

```json
{
"question": "Your question here?",
"options": ["Option 1", "Option 2", "Option 3", "Option 4"],
"correct": "Correct option here"
}


