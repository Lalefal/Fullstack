import { useState } from 'react'

const Button = (props) => {
  const { kasittele, teksti } = props
  return (
    <button onClick={kasittele}> {teksti} </button>
  )
}

const Otsikko = ({text}) => {
  return(
  <h1>{text}</h1>
  )
}

const StatisticsLine  = ({text, value, text2}) => {
  return (
    <tr>
      <td> {text} </td>
      <td> {value} {text2} </td>
      </tr>
  )
}

const Statistics = (props) => {
  const {good, neutral, bad, total, average, positive } = props
  return (
    <table>
     <tbody>
    <StatisticsLine text='Good' value={good} />
    <StatisticsLine text='Neutral' value={neutral} />
    <StatisticsLine text='Bad' value={bad} />
    <StatisticsLine text='All' value={total} />
    <StatisticsLine text='Average' value={average.toFixed(1)}/>
    <StatisticsLine text='Positive' value={positive.toFixed(1)} text2='%' />
    </tbody>
    </table>
  )
}

const History = (props) => {
  const { totalClicks, good, neutral, bad, total, average, positive } = props;
  if (totalClicks === 0 ) {
    return(
    <p>No feedback given</p>
    )
  }
  return (
    <Statistics good={good} neutral={neutral} bad={bad} total={total} average={average} positive= {positive}/>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [points, setPoints] = useState(0)
  const average = total > 0 ? points / total : 0;
  const positive = total > 0 ? good / total * 100 : 0;
 
  const goodClick = () => {
    setGood(good + 1)
    setTotal(total + 1)
    setPoints(points + 1)
  }

  const neutralClick = () => {
    setNeutral(neutral + 1)
    setTotal(total + 1)
  }

  const badClick = () => {
    setBad(bad + 1)
    setTotal(total + 1)
    setPoints(points - 1)
  }

  return (
    <div>
      <Otsikko text='Give feedback' />
      <Button kasittele={goodClick} teksti='Good' />
      <Button kasittele={neutralClick} teksti='Neutral' />
      <Button kasittele={badClick} teksti='Bad' />
      <Otsikko text='Statistics' />
      <History totalClicks={total} good={good} neutral={neutral} bad={bad} total={total} average={average} positive= {positive} />

    </div>
  )
}

export default App