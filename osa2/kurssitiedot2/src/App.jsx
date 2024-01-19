

const Header = (props) => {
  console.log("Header props.course.name: ", props.course.name)  
  return (
    <>
      <h1>
        {props.course.name}
      </h1>
    </>
  )
}

const Part = (props) => {
  console.log("Part: props.part.name ja props.part.exercises: ", props.part.name, " ja ", props.part.exercises)
    
  return (
    <> 
      <p> 
        {props.part.name} {props.part.exercises} 
      </p>
    </>
  )
}

// const Content = (props) => {
// const { parts } = props
const Content = ({ parts }) => {
  console.log("Content props ", parts)
  return (
    <div>
      {parts.map(part => (
        <Part key={part.id} part={part} />
      ))}
      {/* <Part part={props.parts[0]}/>
      <Part part={props.parts[1]}/>
      <Part part={props.parts[2]}/> */}
    </div>
  )
}

  // const Course = (props) => {
  // console.log("Course props ", props)
  // return(
  //   <div>
  //     <Header course={props.course} />
  //     <Content parts={props.course.parts}/>

  // const Course = (props) => {
  // console.log("Course props ", props)
  // const { course } = props
  // return(
  //   <div>
  //     <Header course={course} />
  //     <Content parts={course.parts}/> 

  const Course = ({ course }) => {
  console.log("Course props ", course)
  return(
    <div>
      <Header course={course} />
      <Content parts={course.parts}/> 
      <Total course={course} />
    </div>
  )
}

const Total = ({ course }) => {
  const total = course.parts.reduce((sum, part) => sum + part.exercises, 0);
  console.log("Total: ", total)
  return (
    <>
      <h4>
        Total of {total} exercises 
      </h4>
    </>
  )
}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      }, 
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 4
      }
    ]
  }

  

  return (
    <div>
      <Course course={course} />
      
    </div>
  )
}

export default App



