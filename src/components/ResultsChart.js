import { VictoryAxis, VictoryBar, VictoryStack, VictoryChart } from 'victory'

function ResultsChart ({
  difficulty, numberQuestions, numberCorrect, numberEasy, correctEasy,
  numberMedium, correctMedium, numberHard, correctHard
}) {
  const dataCorrect = [{ difficulty: 'EASY', correct: (correctEasy) },
    { difficulty: 'MEDIUM', correct: (correctMedium) },
    { difficulty: 'HARD', correct: (correctHard) },
    { difficulty: 'TOTAL', correct: (numberCorrect) }
  ]

  const dataTotal = [
    { difficulty: 'EASY', correct: (numberEasy - correctEasy) },
    { difficulty: 'MEDIUM', correct: (numberMedium - correctMedium) },
    { difficulty: 'HARD', correct: (numberHard - correctHard) },
    { difficulty: 'TOTAL', correct: (numberQuestions - numberCorrect) }
  ]
  return (
    <>
      <VictoryChart style={{ background: { fill: '#00000078' } }} domainPadding={40} width={600} height={300} padding={{ top: 20, left: 80, right: 50, bottom: 50 }} domain={(numberQuestions < 15) ? { y: [1, 9] } : { y: [1, 19] }}>
        <VictoryStack colorScale={['#00ff00', '#fdfcf34a']}>
          <VictoryBar
            data={dataCorrect} x='difficulty' y='correct'
            style={{ data: { format: 0 }, labels: { fill: 'white' } }}
          />
          <VictoryBar
            data={dataTotal} x='difficulty' y='correct'
          />
        </VictoryStack>
        <VictoryAxis
          dependentAxis
          label='Total Questions'
          style={{ tickLabels: { fill: 'white', fontSize: '12px' }, axisLabel: { fill: 'white' } }}
        />
        <VictoryAxis
          label='Difficulty'
          style={{ tickLabels: { fill: 'white', fontSize: '12px' }, axisLabel: { fill: 'white' } }}
        />
      </VictoryChart>
    </>
  )
}

export const ResultsChartSingle = ({ difficulty, numberQuestions, numberCorrect }) => {
  const dataCorrect = [{ difficulty: difficulty.toUpperCase(), correct: numberCorrect }
  ]
  const dataTotal = [{ difficulty: difficulty.toUpperCase(), correct: numberQuestions - numberCorrect }
  ]

  return (

    <VictoryChart style={{ background: { fill: '#00000078' } }} domainPadding={40} width={600} height={300} padding={{ top: 20, left: 80, right: 50, bottom: 50 }} domain={(numberQuestions < 15) ? { y: [1, 9] } : { y: [1, 19] }}>
      <VictoryStack colorScale={['#00ff00', '#fdfcf34a']}>
        <VictoryBar
          data={dataCorrect} x='difficulty' y='correct'
          style={{ data: { format: 0 }, labels: { fill: 'white' } }}
        />
        <VictoryBar
          data={dataTotal} x='difficulty' y='correct'
        />
      </VictoryStack>
      <VictoryAxis
        dependentAxis
        label='Total Questions'
        style={{ tickLabels: { fill: 'white', fontSize: '12px' }, axisLabel: { fill: 'white' } }}

      />
      <VictoryAxis
        label='Difficulty'
        style={{ tickLabels: { fill: 'white', fontSize: '12px' }, axisLabel: { fill: 'white' } }}
      />
    </VictoryChart>
  )
}

export default ResultsChart
