import { useState, useEffect } from "react"
import OnePersonRow from "./components/Persons"
import PersonForm from "./components/PersonForm"
import FilterForm from "./components/FilterForm"
import Notification from "./components/Notification"
import personService from "./services/persons"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNo, setNewNo] = useState("")
  const [filterPersons, setFilterPersons] = useState("")
  const [showAll, setShowAll] = useState(true)
  const [msg, setMsg] = useState(null)

  const handleNotification = (message, color) => {
    setMsg({ message, color })
    setTimeout(() => {
      setMsg(null)
    }, 3000)
  }

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
    const NameExists = persons.find(person => person.name === newName)

    NameExists &&
    window.confirm(
      `${newName} is already added to phonebook, replace the old number with a new one?`
    )
      ? (() => {
          const changedNumber = { ...NameExists, number: newNo }
          personService
            .update(NameExists.id, changedNumber)
            .then(returnedPerson => {
              setPersons(
                persons.map(person =>
                  person.id !== NameExists.id ? person : returnedPerson
                )
              )
              setNewName("")
              setNewNo("")
              handleNotification(`Changed number for ${newName}`, {
                text: "green",
                border: "green",
              })
            })
            .catch(error => {
              handleNotification(
                `Information of ${newName} has already been removed from server`,
                {
                  text: "red",
                  border: "red",
                }
              )
            })
        })()
      : !NameExists
      ? personService.create(nameObject).then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName("")
          setNewNo("")
          handleNotification(`Added ${newName}`, {
            text: "green",
            border: "green",
          })
        })
      : null
  }

  const removePerson = person => {
    window.confirm(`Delete ${person.name}?`) &&
      personService
        .remove(person.id)
        .then(response => {
          setPersons(persons.filter(p => p.id !== person.id))
          handleNotification(`Deleted ${person.name}`, {
            text: "green",
            border: "green",
          })
        })
        .catch(error => {
          handleNotification(
            `Information of ${newName} has already been removed from server`,
            {
              text: "red",
              border: "red",
            }
          )
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
      <Notification message={msg && msg.message} color={msg && msg.color} />
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
      <table>
        <tbody>
          {personsToShow.map(person => (
            <OnePersonRow
              key={person.id}
              nimi={person.name}
              nro={person.number}
              onClick={() => removePerson(person)}
            />
          ))}
        </tbody>
      </table>
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
//step9, 2.14 yhteystietojen poistaminen
//step10, 2.15 tallennetun numeron korvaaminen
//step11, 2.16 parempi virheilmoitus
//step12, 2.17 epäonnistuneen operaation ilmoitus eri värillä
// setMsg(`Added ${newName}`)
// setTimeout(() => {
//   setMsg(null)
// }, 3000)

// if (!persons.some(person => person.name === newName)) {
//   setPersons(persons.concat(nameObject))
//   setNewName("")
// } else {
//   console.log('Varattu', newName)
// }

// {
//   "persons":[
//     {
//       "name": "Arto Hellas",
//       "number": "040-123456",
//       "id": 1
//     },
//     {
//       "name": "Ada Lovelace",
//       "number": "39-44-5323523",
//       "id": 2
//     },
//     {
//       "name": "Dan Abramov",
//       "number": "12-43-234345",
//       "id": 3
//     },
//     {
//       "name": "Mary Poppendieck",
//       "number": "39-23-6423122",
//       "id": 4
//     }
//   ]
// }
