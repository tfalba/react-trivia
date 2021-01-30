import { VictoryBar, VictoryTheme, VictoryStack, VictoryChart } from 'victory'
// import { useState } from 'react'
function ResultsChart ({
  difficulty, numberQuestions, numberCorrect, numberEasy, correctEasy,
  numberMedium, correctMedium, numberHard, correctHard
}) {
  // const [dataCorrect, setDataCorrect] = useState([])
  // const [dataTotal, setDataTotal] = useState([])

  const dataCorrect = [{ difficulty: `easy ${parseFloat(100 * correctEasy / numberEasy).toFixed(0) + '%'}`, correct: correctEasy },
    { difficulty: `medium ${0 + parseFloat(100 * correctMedium / numberMedium).toFixed(0) + '%'}`, correct: correctMedium },
    { difficulty: `hard ${parseFloat(100 * correctHard / numberHard).toFixed(0) + '%'}`, correct: correctHard },
    { difficulty: `total ${parseFloat(100 * numberCorrect / numberQuestions).toFixed(0) + '%'}`, correct: numberCorrect }
  ]
  const dataTotal = [
    { difficulty: `easy ${parseFloat(100 * correctEasy / numberEasy).toFixed(0) + '%'}`, correct: numberEasy - correctEasy },
    { difficulty: `medium ${0 + parseFloat(100 * correctMedium / numberMedium).toFixed(0) + '%'}`, correct: numberMedium - correctMedium },
    { difficulty: `hard ${parseFloat(100 * correctHard / numberHard).toFixed(0) + '%'}`, correct: numberHard - correctHard },
    { difficulty: `total ${parseFloat(100 * numberCorrect / numberQuestions).toFixed(0) + '%'}`, correct: numberQuestions - numberCorrect }
  ]

  return (
    <>
      {(difficulty === 'any')
        ? (
          <VictoryChart domainPadding={40} width={600} height={300} theme={VictoryTheme.material} padding={{ top: 20, left: 80, right: 50, bottom: 50 }}>
            <VictoryStack>
              <VictoryBar
                data={dataCorrect} x='difficulty' y='correct' style={
                  {
                    data: { stroke: '#333366' }
                  }
                }
              />
              <VictoryBar
                data={dataTotal} x='difficulty' y='correct' style={
                  {
                    data: { stroke: '#333366' }
                  }
                }
              />
            </VictoryStack>
          </VictoryChart>
          )
        : (
          <VictoryChart domainPadding={40} width={600} height={300} theme={VictoryTheme.material} padding={{ top: 20, left: 80, right: 50, bottom: 50 }}>
            <VictoryStack>
              <VictoryBar
                data={dataCorrect} x='difficulty' y='correct' style={
                  {
                    data: { stroke: '#333366' }
                  }
                }
              />
              <VictoryBar
                data={dataTotal} x='difficulty' y='correct' style={
                  {
                    data: { stroke: '#333366' }
                  }
                }
              />
            </VictoryStack>
          </VictoryChart>

          )}
    </>
  )
}

export default ResultsChart
