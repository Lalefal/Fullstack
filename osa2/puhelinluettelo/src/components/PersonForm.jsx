const Button = ({ teksti }) => {
  return (
    <div>
      <button type="submit"> {teksti} </button>
    </div>
  )
}

export const FormRow = ({ teksti, value, onChange }) => {
  return (
    <div>
      <label> {teksti} </label>
      <input value={value} onChange={onChange} />
    </div>
  )
}

export const PersonForm = (props) => {
  const { onSubmit, nameValue, numberValue, onNameChange, onNumberChange } =
    props
  return (
    <form onSubmit={onSubmit}>
      <FormRow teksti="Name: " value={nameValue} onChange={onNameChange} />
      <FormRow
        teksti="Number: "
        value={numberValue}
        onChange={onNumberChange}
      />
      <Button teksti="Add" />
    </form>
  )
}

export default PersonForm

//   <form onSubmit={addName}>
//     <div>
//       <label>Name: </label>
//       <input value={newName} onChange={handleNameChange} />
//     </div>
//     <div>
//       <label>Number: </label>
//       <input value={newNo} onChange={handleNumberChange} />
//     </div>
//     <div>
//       <button type="submit">add</button>
//     </div>
//   </form>
