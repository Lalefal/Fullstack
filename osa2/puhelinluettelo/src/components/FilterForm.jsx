import { FormRow } from "./PersonForm"

const FilterForm = (props) => {
  const { value, onChange } = props
  return (
    <form>
      <FormRow teksti="Filter shown with " value={value} onChange={onChange} />
    </form>
  )
}

export default FilterForm

//   <form>
//     <div>
//       Filter shown with{" "}
//       <input
//         value={filterPersons}
//         onChange={handleFilterPersons}
//         // onInput={handleFilterPersons}
//       />
//     </div>
//   </form>
