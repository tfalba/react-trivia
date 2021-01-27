import './App.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Category from './components/Category.js'
import Question from './components/Question.js'
import cleanData from './components/CleanData.js'
import generalImage from './images/general-logo.png'

function App () {
  const [categories, setCategories] = useState([])
  useEffect(() => {
    axios.get('https://opentdb.com/api_category.php')
      .then(res => {
        const categories = cleanData(res.data.trivia_categories)
        setCategories(categories)
      })
  }, [])

  const [isCategory, setCategory] = useState(null)
  const [questions, setQuestions] = useState([])
  const [idxQuestion, setQuestion] = useState(0)
  const [numberCorrect, countCorrect] = useState(0)

  useEffect(() => {
    if (isCategory) {
      axios.get(`https://opentdb.com/api.php?amount=10&category=${parseInt(isCategory.id)}&difficulty=medium&type=multiple&encode=url3986`)
        .then(res => {
          const questions = []
          for (const question of res.data.results) {
            const answers = []
            for (const answer of question.incorrect_answers) {
              answers.push(decodeURIComponent(answer))
            }
            answers.push(decodeURIComponent(question.correct_answer))
            const shuffledAnswers = answers
              .map((a) => ({ sort: Math.random(), value: a }))
              .sort((a, b) => a.sort - b.sort)
              .map((a) => a.value)
            question.shuffledAnswers = shuffledAnswers
            question.question = decodeURIComponent(question.question)
            question.correct_answer = decodeURIComponent(question.correct_answer)
            questions.push(question)
          }
          setQuestions(questions)
        })
    }
  }
  , [isCategory])

  function returnToCategory () {
    setCategory(null)
    setQuestion(0)
  }

  return (
    <div className='flex-col'>
      {(isCategory === null) && (
        <div className='flex-col category-set'>
          <div className='flex header'>
            <h1>TRACY'S TRIVIA TIME</h1>
            <img className='header-image' src={generalImage} alt='trivia-logo' />
          </div>
          <div className='flex-center question-block'>
            {categories.map((category, idx) => (<Category setCategory={setCategory} category={category} key={category.id} />
            ))}
          </div>
        </div>
      )}

      {isCategory && (
        <div className='flex-col'>
          <div className='flex-col category-set'>
            <div className='flex header'>
              <h1>{isCategory.name}</h1>
              <img className='header-image' src={isCategory.coverImg} alt={`${isCategory.name} logo`} />
            </div>
          </div>
          <div className='flex-col-center question-block'>
            <button className='return-categories category-button' onClick={returnToCategory}>Return to Categories</button>
            <div className='question-card'>
              {questions[idxQuestion] && (
                <Question question={questions[idxQuestion]} key={idxQuestion} setQuestion={setQuestion} idxQuestion={idxQuestion} numberQuestions={questions.length} numberCorrect={numberCorrect} countCorrect={countCorrect} />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
