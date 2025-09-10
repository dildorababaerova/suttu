import Header from './Header.jsx';
import Content from './Content.jsx'

const Course = ({course}) => {
    console.log(course);
    
    return (
        <div>
            <Header course={course}/>
            <Content course={course} />
        </div>
    )
}

export default Course
