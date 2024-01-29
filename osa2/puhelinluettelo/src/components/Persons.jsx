const OnePersonRow = ({ nimi, nro, onClick }) => {
  return (
    <tr>
      <td>
        {nimi} {nro}
      </td>
      <td>
        <button onClick={onClick}>Delete</button>
      </td>
    </tr>
  )
}

// const Persons = ({ tama }) => {
//   return (
//     <table>
//       <tbody>
//         {tama.map(person => (
//           <OnePersonRow
//             key={person.name}
//             nimi={person.name}
//             nro={person.number}
//             id={person.id}
//             onClick={removePerson}
//           />
//         ))}
//       </tbody>
//     </table>
//   )
// }

export default OnePersonRow
