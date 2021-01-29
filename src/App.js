
import { useState, useEffect } from 'react'
import axios from 'axios'
// import 'bootstrap/dist/css/bootstrap.min.css'
// import DropdownButton from 'react-bootstrap/DropdownButton'
// import Dropdown from 'react-bootstrap/Dropdown'
import './App.css'
import Category from './components/Category.js'
import Question from './components/Question.js'
import cleanData from './components/CleanData.js'
import generalImage from './images/general-logo.png'
import DropdownComponent from './components/DropdownComponent'

function App () {
  const [categories, setCategories] = useState([])
  const [token, setToken] = useState([])

  useEffect(() => {
    axios.get('https://opentdb.com/api_token.php?command=request')
      .then(res => {
        const token = (res.data.token)
        setToken(token)
      })
  }, [])

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
  const [difficulty, setDifficulty] = useState('any')
  const [numberQuestions, setNumberQuestions] = useState(10)

  useEffect(() => {
    if (isCategory && difficulty && token && numberQuestions) {
      let difficultyInput = difficulty
      if (difficulty === 'any') {
        difficultyInput = ''
      }
      axios.get(`https://opentdb.com/api.php?amount=${parseInt(numberQuestions)}&category=${isCategory.id}&encode=url3986&difficulty=${difficultyInput}&token=${token}`)
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
  , [isCategory, difficulty, token, numberQuestions])

  function returnToCategory () {
    setCategory(null)
    setQuestions([])
    setQuestion(0)
    countCorrect(0)
  }

  let footerStyle = {}
  if (isCategory) {
    footerStyle = {
      // height: '160px',
      backgroundImage: `url(${isCategory.coverImg})`
      // width: '100%',
      // backgroundSize: 'contain',
      // marginBottom: '100px'
    }
  }

  let headerBarStyle = {
    // height: '150px',
    backgroundImage: `url(${generalImage})`
    // width: '150px',
    // backgroundSize: 'contain',
    // backgroundRepeatX: 'no-repeat',
    // backgroundRepeatY: 'no-repeat'
    // marginBottom: '100px'
  }
  if (isCategory) {
    headerBarStyle = {
      // height: '150px',
      backgroundImage: `url(${isCategory.coverImg})`
      // width: '20%',
      // backgroundSize: 'contain',
      // backgroundRepeatX: 'no-repeat',
      // backgroundRepeatY: 'no-repeat'
      // marginBottom: '100px'
    }
  }
  const handleSelect = (event) => {
    setDifficulty(event)
  }

  const handleSelectNumberQuestions = (event) => {
    setNumberQuestions(event)
  }

  return (
    <div className='flex-col'>
      {(isCategory === null) && (
        <div className='flex-col-center category-set'>

          <div className='flex header'>
            <div className='header-title'>TRIVIA TIME</div>
            <div className='header-bar' style={headerBarStyle} />
          </div>
          <div className='flex difficulty-level'>
            <DropdownComponent onSelect={handleSelect} eventKey1='easy' eventKey2='medium' eventKey3='hard' eventKey4='any' title='Difficulty Level' />
            {difficulty && (<div className='difficulty-value'>{difficulty.toUpperCase()}</div>)}
            <DropdownComponent onSelect={handleSelectNumberQuestions} eventKey1='3' eventKey2='5' eventKey3='10' eventKey4='20' title='Number of Questions' />
            {/*
            <DropdownButton
              className='levels'
              alignRight
              title='Number of questions'
              id='dropdown-basic'
              onSelect={handleSelectNumberQuestions}
            >
              <Dropdown.Item eventKey='3'>Three</Dropdown.Item>
              <Dropdown.Item eventKey='5'>Five</Dropdown.Item>
              <Dropdown.Item eventKey='10'>Ten</Dropdown.Item>
              <Dropdown.Item eventKey='20'>Twenty</Dropdown.Item>
            </DropdownButton> */}
            {difficulty && (<div className='difficulty-value'>{numberQuestions}</div>)}
          </div>
          {/* <div>Number of Questions</div> */}
          <div className='flex-center question-block animate__animated animate__fadeInUp'>
            {categories.map((category, idx) => (<Category setCategory={setCategory} category={category} key={category.id} />
            ))}
          </div>
        </div>
      )}

      {isCategory && (
        <div className='flex-col'>
          <div className='flex-col category-set'>
            <div className='flex header'>
              <div className='header-title'>{isCategory.name}</div>
              <div className='header-bar' style={headerBarStyle} />
            </div>

          </div>
          <div className='flex-col question-block'>
            <button className='return-categories category-button' onClick={returnToCategory}>Return to Categories</button>
            {questions[idxQuestion] && (
              <Question question={questions[idxQuestion]} key={idxQuestion} setQuestion={setQuestion} idxQuestion={idxQuestion} numberQuestions={numberQuestions} numberCorrect={numberCorrect} countCorrect={countCorrect} setCategory={setCategory} setQuestions={setQuestions} isCategory={isCategory} questions={questions} />
            )}
            <div className='footer' style={footerStyle} />
          </div>
        </div>
      )}
    </div>
  )
}

export default App
