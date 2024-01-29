import { useState, useEffect } from "react"
import Persons from "./components/Persons"
import PersonForm from "./components/PersonForm"
import FilterForm from "./components/FilterForm"
import personService from "./services/persons"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNo, setNewNo] = useState("")
  const [filterPersons, setFilterPersons] = useState("")
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    personService.getAll().then(initialData => {
      setPersons(initialData)
    })
  }, [])

  const addName = event => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNo,
    }
    const newNameExists = persons.some(person => person.name === newName)
    newNameExists
      ? alert(`${newName} is already added to phonebook`)
      : personService.create(nameObject).then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName(""), setNewNo("")
        })
  }

  const handleNameChange = event => {
    setNewName(event.target.value)
  }

  const handleNumberChange = event => {
    setNewNo(event.target.value)
  }

  const handleFilterPersons = event => {
    const inputLenght = event.target.value
    setFilterPersons(event.target.value)
    setShowAll(inputLenght.length === 0) //vaihtaa true/false sen mukaan, onko fieldissä sisältöä
  }

  const personsToShow = showAll
    ? persons
    : persons.filter(person =>
        person.name.toLowerCase().includes(filterPersons.toLowerCase())
      )

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterForm value={filterPersons} onChange={handleFilterPersons} />

      <h3>Add a new</h3>
      <PersonForm
        onSubmit={addName}
        nameValue={newName}
        onNameChange={handleNameChange}
        numberValue={newNo}
        onNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>
      <Persons tama={personsToShow} />
    </div>
  )
}

export default App

//step1, 2.6, henkilön lisäys luetteloon, voit käyttää kentän key arvona henkilön nimeä
//step2, 2.7, jo olemassa olevan nimen lisäyksen esto, virheilmo alert
//step3, 2.8 puhelinnumeron lisäys
//step4, 2.9 hakukenttä
//step5, 2.10 refaktorointi, erota sovelluksesta 3 komponenttia

//step6, 2.11 sovelluksen alkutila tiedostoon, haku palvelimelta
//step7, 2.12 sykronoi luetteloon lisättävät numerot palvelimelle
//step8, 2.13 siirrä server-kommunikointi omaan moduuliin

// if (!persons.some(person => person.name === newName)) {
//   setPersons(persons.concat(nameObject))
//   setNewName("")
// } else {
//   console.log('Varattu', newName)
// }
