
import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import Category from './components/Category.js'
import Question from './components/Question.js'
import cleanData from './components/CleanData.js'
import generalImage from './images/general-logo.png'
import DropdownComponent from './components/DropdownComponent'
import ResultsChart, { ResultsChartSingle } from './components/ResultsChart'

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
  const [numberEasy, countEasy] = useState(0)
  const [numberMedium, countMedium] = useState(0)
  const [numberHard, countHard] = useState(0)
  const [correctEasy, countCorrectEasy] = useState(0)
  const [correctMedium, countCorrectMedium] = useState(0)
  const [correctHard, countCorrectHard] = useState(0)
  const [gameComplete, setGameComplete] = useState(false)
  const [guess, setGuess] = useState('')
  const [submission, submitAnswer] = useState(false)
  const [show, setShow] = useState(false)

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
    setGameComplete(false)
    countEasy(0)
    countMedium(0)
    countHard(0)
    countCorrectEasy(0)
    countCorrectMedium(0)
    countCorrectHard(0)
    setGuess('')
    submitAnswer(false)
    setShow(false)
  }

  return (
    <div className='flex-col'>
      {(isCategory === null && gameComplete === false) && (
        <div className='flex-col-center category-set'>
          <div className='flex header'>
            <div className='header-title'>TRIVIA TIME</div>
            <div className='header-bar' style={{ backgroundImage: `url(${generalImage})` }} />
          </div>
          <div className='flex difficulty-level'>
            <DropdownComponent onSelect={(e) => setDifficulty(e)} eventKey1='easy' eventKey2='medium' eventKey3='hard' eventKey4='any' title='Difficulty Level' />
            {difficulty && (<div className='difficulty-value'>{difficulty.toUpperCase()}</div>)}
            <DropdownComponent onSelect={(e) => setNumberQuestions(e)} eventKey1='3' eventKey2='5' eventKey3='10' eventKey4='20' title='Number of Questions' />
            {difficulty && (<div className='difficulty-value'>{numberQuestions}</div>)}
          </div>
          <div className='flex-center question-block'>

            {categories.map((category, idx) => (<Category setCategory={setCategory} category={category} key={category.id} />
            ))}
          </div>
        </div>
      )}

      {(isCategory && gameComplete === false) && (
        <div className='flex-col'>
          {(questions.length === 0)
            ? (
              <>
                <div className='flex header'>
                  <div className='header-title'>TRIVIA TIME</div>
                  <div className='header-bar' style={{ backgroundImage: `url(${generalImage})` }} />
                </div>
                <button className='return-categories category-button' onClick={returnToCategory}>Return to Categories</button>
                <div className='question-card'>Not Enough Questions Available</div>
              </>)
            : (
              <div className='flex-col'>
                <div className='flex-col category-set'>
                  <div className='flex header'>
                    <div className='header-title'>{isCategory.name}</div>
                    <div className='header-bar' style={{ backgroundImage: `url(${isCategory.coverImg})` }} />
                  </div>

                </div>
                <div className='flex-col question-block'>
                  <button className='return-categories category-button' onClick={returnToCategory}>Return to Categories</button>
                  {questions[idxQuestion] && (
                    <Question
                      question={questions[idxQuestion]} key={idxQuestion} setQuestion={setQuestion}
                      idxQuestion={idxQuestion} numberQuestions={numberQuestions} numberCorrect={numberCorrect}
                      countCorrect={countCorrect} setCategory={setCategory} setQuestions={setQuestions}
                      isCategory={isCategory} questions={questions} numberEasy={numberEasy} countEasy={countEasy}
                      numberMedium={numberMedium} countMedium={countMedium} numberHard={numberHard}
                      countHard={countHard} correctEasy={correctEasy} countCorrectEasy={countCorrectEasy}
                      correctMedium={correctMedium} countCorrectMedium={countCorrectMedium} correctHard={correctHard}
                      countCorrectHard={countCorrectHard} gameComplete={gameComplete} setGameComplete={setGameComplete}
                      guess={guess} setGuess={setGuess} submission={submission} submitAnswer={submitAnswer} show={show} setShow={setShow}
                    />
                  )}
                  <div className='footer' style={{ backgroundImage: `url(${isCategory.coverImg})` }} />
                </div>
              </div>
              )}
        </div>
      )}
      {gameComplete && (
        <>
          <div className='flex header'>
            <div className='header-title'>TRIVIA TIME</div>
            <div className='header-bar' style={{ backgroundImage: `url(${generalImage})` }} />
          </div>
          <button className='return-categories category-button' onClick={returnToCategory}>Return to Categories</button>
          {(difficulty === 'any')
            ? (
              <ResultsChart
                difficulty={difficulty} numberQuestions={numberQuestions} numberCorrect={numberCorrect}
                numberEasy={numberEasy} correctEasy={correctEasy} numberMedium={numberMedium} correctMedium={correctMedium}
                numberHard={numberHard} correctHard={correctHard}
              />)
            : (
              <ResultsChartSingle difficulty={difficulty} numberQuestions={numberQuestions} numberCorrect={numberCorrect} />
              )}
        </>
      )}
    </div>
  )
}

export default App
