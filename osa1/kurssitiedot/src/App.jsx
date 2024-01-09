const Header = (props) => {
  console.log("Header props.course.name: " + props.course)  
  return (
    <>
      <h1>
        {props.course}
      </h1>
    </>
  )
}

const Part = (props) => {
  console.log("Part: props.part.name ja props.part.exercises: " + props.name + " ja " + props.exercises)
    return (
    <> 
      <p>{props.name} {props.exercises}</p>
    </>
  )
}


const Content = (props) => {
  console.log("Content props: " + props.part1 + " ja " + props.exerc1 )
  return (
    <div>
      <Part name={props.part1} exercises={props.exerc1} />
      <Part name={props.part2} exercises={props.exerc2} />
      <Part name={props.part3} exercises={props.exerc3} />

    </div>
  )
}

const Total = (props) => {
  console.log("Total props: " + props)
  return (
    <div>
       <p>Number of exercises {props.exerc1 + props.exerc2 + props.exerc3}</p>
    </div>
  )
}


const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  return (
    <div>
      <Header course={course} />
      <Content part1={part1} exerc1={exercises1} part2={part2} exerc2={exercises2} part3={part3} exerc3={exercises3}/>
      <Total exerc1={exercises1} exerc2={exercises2} exerc3={exercises3}/>
    </div>
  )
}

export default App


