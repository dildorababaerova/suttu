const Total = ({parts}) => {

    const total = parts.reduce((sum, part) => sum + part.exercises, 0)
    return (
        <div>
            <strong>
            Total of {total} exercises
            </strong>
        </div>
    )

}


const Part = ({part}) => {
    return (
        <div>
            {part.name} {part.exercises}
        </div>
    )
}

const Content = ({parts}) => {
    const content = parts.map(part =>
    < Part key = {part.id} part={part}/>  
    )
    return (
        <div>{content}</div>
    )
}


const Header = ({name}) => {
    return (
        <div>
            <h1>{name}</h1>
        </div>
    )
}

const Course = ({courses}) => {
    console.log(courses[0].name);

    return (

        <div>
            {courses.map(course =>
            <div key={course.id}>

                < Header  name={course.name}/>   
                < Content parts={course.parts}/> 
                < Total parts ={course.parts}/>  
            </div>
            )
            }

        </div>
    )

}

export default Course