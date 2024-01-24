const OnePersonRow = ({ nimi, nro }) => {
  return (
    <tr>
      <td>
        {nimi} {nro}
      </td>
    </tr>
  )
}

const Persons = ({ tama }) => {
  return (
    <table>
      <tbody>
        {tama.map((person) => (
          <OnePersonRow
            key={person.name}
            nimi={person.name}
            nro={person.number}
          />
        ))}
      </tbody>
    </table>
  )
}

export default Persons
