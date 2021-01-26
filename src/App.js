import './App.css'
import { useState, useEffect } from 'react'
import axios from 'axios'

// let unshuffled = ['hello', 'a', 't', 'q', 1, 2, 3, {cats: true}]

// let shuffled = unshuffled
//   .map((a) => ({sort: Math.random(), value: a}))
//   .sort((a, b) => a.sort - b.sort)
//   .map((a) => a.value)

function App () {
  const [categories, setCategories] = useState([])
  useEffect(() => {
    axios.get('https://opentdb.com/api_category.php')
      .then(res => {
        const myCategories = []
        for (let i = 0; i < 15; i++) {
          myCategories.push(res.data.trivia_categories[i])
        }
        setCategories(myCategories)
        // setCategories(res.data.trivia_categories)
      })
  }, [])

  const [isCategory, setCategory] = useState({})
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    // setCategory(isCategory)
    const getQuestions = () => {
      axios.get(`https://opentdb.com/api.php?amount=10&category=${parseInt(isCategory.id)}&difficulty=medium&type=multiple&encode=url3986`)
        .then(res => {
          // console.log(res.data.results)
          setQuestions(res.data.results)
        })
    }
    getQuestions()
    // console.log(questions)
  }, [isCategory.id])

  return (
    <div className='flex-col'>
      {(isCategory.id !== 9 && isCategory.id !== 10) && (
        <div className='flex-col'>

          <h1>Trivia Categories</h1>
          <div className='flex-center'>
            {categories.map((category, idx) => (<Category setCategory={setCategory} category={category} key={category.id} />
            ))}

          </div>
        </div>

      )}

      {(isCategory.id > 0) && (

        <div className='flex-col'><h1>Selected Category</h1>
          <Category setCategory={setCategory} category={isCategory} />
        </div>
      )}

      <div className='flex-col'><h1>Questions</h1>

        {questions.map((question, idx) => (<Question question={question} key={idx} />))}

      </div>

    </div>
  )
}

function Category (props) {
  const { category } = props
  const { setCategory } = props

  return (
    <div>
      <div className='category-button' onClick={() => setCategory(category)}>{category.name}</div>
    </div>
  )
}

function Question (props) {
  const { question } = props
  // const { chooseAnswer } = props
  const [guess, chooseAnswer] = useState('')
  const answers = []
  for (const answer of question.incorrect_answers) {
    answers.push(answer)
  }
  answers.push(question.correct_answer)
  const shuffledAnswers = answers
    .map((a) => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)

  return (
    <div className='flex-sb'>
      <div className='flex-col'>
        <div>{decodeURIComponent(question.question)}</div>
        <ul>{shuffledAnswers.map((answer, idx) =>
          <li onClick={() => chooseAnswer(answer)} answer={answer} key={idx}>{decodeURIComponent(answer)}</li>)}
        </ul>
      </div>
      {(guess === question.correct_answer) && (<div className='answer-prompt'>YES</div>)}
      {(guess !== question.correct_answer && guess !== '') && (<div className='answer-prompt'>NO</div>)}
    </div>
  )
}
export default App
