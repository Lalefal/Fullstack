import { useState } from 'react'

const Button = (props) => {
  console.log('eka nappi')
  const { kasittele, teksti } = props
  return (
    <button onClick={kasittele}> {teksti} </button>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodClick = () => {
    setGood(good + 1)
  }

  const neutralClick = () => {setNeutral(neutral + 1)}

  const badClick = () => {setBad(bad + 1)}

  return (
    <div>
      <h1>Give feedback</h1>
      <Button kasittele={goodClick} teksti='Good' />
      <Button kasittele={neutralClick} teksti='Neutral' />
      <Button kasittele={badClick} teksti='Bad' />
      <h1>Statistics</h1>
      <p>Good {good}</p>
      <p>Neutral {neutral}</p>
      <p>Bad {bad}</p>
    </div>
  )
}

export default App