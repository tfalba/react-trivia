export function chooseAnswer (answer, submission, setGuess) {
  if (!submission) {
    setGuess(answer)
  }
}

export function nextQuestion (setShow, setQuestion, idxQuestion, submitAnswer, numberQuestions, setCategory, setQuestions, countCorrect, categoryOption, questionOption) {
  setShow(false)
  setQuestion(idxQuestion + 1)
  submitAnswer(false)
  if (idxQuestion === numberQuestions - 1) {
    returnToCategory(categoryOption, questionOption, setCategory, setQuestions, setQuestion, countCorrect)
  }
}
function returnToCategory (categoryOption, questionsOption, setCategory, setQuestions, setQuestion, countCorrect) {
  setCategory(categoryOption)
  setQuestions(questionsOption)
  setQuestion(0)
  countCorrect(0)
}

// export function submit (guess, answer, countCorrect, numberCorrect, submitAnswer, setShow, idxQuestion, numberQuestions) {
//   if (guess === answer) {
//     countCorrect(numberCorrect + 1)
//   } else {
//     countCorrect(numberCorrect)
//   }
//   function update () {
//     // return show, submission
//   }
//   // setShow(true)
//   submitAnswer(true)
//   // submitAnswer(true)
//   // setShow(true)
//   if (idxQuestion === numberQuestions - 1) {
//     let scheduledFunction = false
//     if (scheduledFunction) {
//       clearTimeout(scheduledFunction)
//     }
//     scheduledFunction = setTimeout(function () { setShow(true) }, 2000)
//   }
// }
