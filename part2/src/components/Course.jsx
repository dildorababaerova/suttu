import Header from './Header.jsx';
import Content from './Content.jsx'
import Total from './Total.jsx'

const Course = ({course}) => {
    console.log(course);
    
    return (
        <div>
            <Header course={course}/>
            <Content course={course} />
            <Total course={course} />
        </div>
    )
}

export default Course
