//step1, 2.6, henkilön lisäys luetteloon
//voit käyttää kentän key arvona henkilön nimeä
//step2, 2.7, jo olemassa olevan nimen lisäyksen esto, virheilmo alert
//step3, 2.8 puhelinnumeron lisäys

import { useState } from "react"

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: "Arto Hellas",
      number: "040-1231244",
    },
  ])
  const [newName, setNewName] = useState("")
  const [newNo, setNewNo] = useState("")

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNo,
    }

    const nameExists = persons.some((person) => person.name === newName)
    nameExists
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

  return (
    <div>
      <h2>Phonebook</h2>

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
        {persons.map((person) => (
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
