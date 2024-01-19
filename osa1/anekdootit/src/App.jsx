import { useState } from 'react'

const Button = (props) => {
  const { kasittele, teksti } = props
  
  
  return (
    <button onClick={kasittele}> {teksti} </button>
  )
}

const Texts = ({text, value, text2}) => {
  return(
    <p>{text} {value} {text2}</p>
  )
}

const Title = ({text}) => {
  return(
    <h2> {text} </h2>
    
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));
  const max = Math.max(...votes)
  const indeksi = votes.indexOf(max)
  const paras = anecdotes[indeksi]

  const randomIndex = () => {
    const random = Math.floor(Math.random() * (anecdotes.length))
    return (
      random
    )
  }

  const nextClick = () => {
    const index = randomIndex();
    setSelected(index)
  }

  const voteClick = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
  }

  // const mostVotes = () => {
  //   const max = Math.max(...votes)
  //   const index = votes.indexOf(max)
  //   return anecdotes[index]
  // }

  return (
    <div>
      <Title text="Anectode of the day" />
      <Texts text={anecdotes[selected]} />
      <Texts text='has' value={votes[selected]} text2='votes' />
      <Button kasittele={voteClick} teksti='Vote' />
      <Button kasittele={nextClick} teksti='Next anecdote' />

      <Title text="Anectode with most votes" />
      <Texts text={paras} />
      <Texts text='has' value={max} text2='votes' />

   
    </div>
  )
}

export default App