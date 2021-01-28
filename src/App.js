
import { useState, useEffect } from 'react'
import axios from 'axios'
// import 'bootstrap/dist/css/bootstrap.min.css'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import './App.css'
import Category from './components/Category.js'
import Question from './components/Question.js'
import cleanData from './components/CleanData.js'
import generalImage from './images/general-logo.png'

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
      height: '160px',
      backgroundImage: `url(${isCategory.coverImg})`,
      width: '100%',
      backgroundSize: 'contain',
      marginBottom: '100px'
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
        <div className='flex-col category-set'>
          <div className='flex header'>
            <div className='header-title'>TRACY'S TRIVIA TIME</div>
            <img className='header-image' src={generalImage} alt='trivia-logo' />
            {/* </div> */}
            <div className='flex difficulty-level'>
              <DropdownButton
                className='levels'
                alignRight
                title='Choose a difficulty level'
                id='dropdown-basic'
                onSelect={handleSelect}
              >
                <Dropdown.Item eventKey='easy'>Easy</Dropdown.Item>
                <Dropdown.Item eventKey='medium'>Medium</Dropdown.Item>
                <Dropdown.Item eventKey='hard'>Hard</Dropdown.Item>
                <Dropdown.Item eventKey='any'>Any</Dropdown.Item>
              </DropdownButton>
              {difficulty && (<div className='difficulty-value'>{difficulty.toUpperCase()}</div>)}
              <DropdownButton
                className='levels'
                alignRight
                title='Choose number of questions'
                id='dropdown-basic'
                onSelect={handleSelectNumberQuestions}
              >
                <Dropdown.Item eventKey='5'>Five</Dropdown.Item>
                <Dropdown.Item eventKey='10'>Ten</Dropdown.Item>
                <Dropdown.Item eventKey='20'>Twenty</Dropdown.Item>
              </DropdownButton>
              {difficulty && (<div className='difficulty-value'>{numberQuestions}</div>)}
            </div>
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
              <img className='header-image' src={isCategory.coverImg} alt={`${isCategory.name} logo`} />
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

// &token=54f7bf78d1c5a486a2d9dd4f1508cc26816b6fda6fcc11d696953d57cb1cddc9
// &token=54f7bf78d1c5a486a2d9dd4f1508cc26816b6fda6fcc11d696953d57cb1cddc9
