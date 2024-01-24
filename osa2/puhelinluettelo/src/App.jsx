//step1, 2.6, henkilön lisäys luetteloon
//voit käyttää kentän key arvona henkilön nimeä
//step2, 2.7, jo olemassa olevan nimen lisäyksen esto, virheilmo alert
//step3, 2.8 puhelinnumeron lisäys
//step4, 2.9 hakukenttä

import { useState } from "react"

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ])
  const [newName, setNewName] = useState("")
  const [newNo, setNewNo] = useState("")
  const [filterPersons, setFilterPersons] = useState("")
  const [showAll, setShowAll] = useState(true)

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNo,
    }
    const newNameExists = persons.some((person) => person.name === newName)
    newNameExists
      ? alert(`${newName} is already added to phonebook`)
      : setPersons(persons.concat(nameObject)), //setPersons([...persons, nameObject])
      setNewName(""),
      setNewNo("")
    // if (!persons.some(person => person.name === newName)) {
    //   setPersons(persons.concat(nameObject))
    //   setNewName("")
    // } else {
    //   console.log('Varattu', newName)
    // }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNo(event.target.value)
  }

  const handleFilterPersons = (event) => {
    const inputLenght = event.target.value
    setFilterPersons(event.target.value)
    setShowAll(inputLenght.length === 0) //vaihtaa true/false sen mukaan, onko fieldissä sisältöä
  }

  const personsToShow = showAll
    ? persons
    : persons.filter((person) =>
        person.name.toLowerCase().includes(filterPersons.toLowerCase())
      )

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          Filter shown with{" "}
          <input
            type="text"
            value={filterPersons}
            onInput={handleFilterPersons}
          />
        </div>
      </form>
      <div>debug: {filterPersons}</div>

      <h2>Add a new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNo} onChange={handleNumberChange} />
        </div>

        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      <div>
        {personsToShow.map((person) => (
          <p key={person.name}>
            {" "}
            {person.name} {person.number}{" "}
          </p>
        ))}
      </div>
    </div>
  )
}

export default App

//onChange={(() => setShowAll(!showAll), handleFilterPersons)}
