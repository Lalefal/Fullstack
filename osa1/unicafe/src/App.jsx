import { useState } from 'react'

const Button = (props) => {
  console.log('nappi props', props)
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

const Statistics  = ({text, value, text2}) => {
  return (
    <p>{text} {value} {text2}</p>
  )
}
// const Statistics  = (props) => {
//   const { text, value, text2 } = props
//   return (
//     <p>{text} {value} {text2}</p>
//   )
// }

const History = (props) => {
  const { totalClicks, good, neutral, bad, total, average, positive } = props;
  if (totalClicks === 0 ) {
    return(
    <p>No feedback given</p>
    )
  }
  return (
    <div> 
      <Statistics text='Good' value={good} />
      <Statistics text='Neutral' value={neutral} />
      <Statistics text='Bad' value={bad} />
      <Statistics text='All' value={total} />
      <Statistics text='Average' value={average}/>
      <Statistics text='Positive' value={positive.toFixed(2)} text2='%' />
    </div>
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

      {/* <Statistics text='Neutral' value={neutral} />
      <Statistics text='Bad' value={bad} />
      <Statistics text='All' value={total} />
      <Statistics text='Average' value={average}/>
      <Statistics text='Positive' value={positive.toFixed(2)} text2='%' /> */}

    </div>
  )
}

export default App