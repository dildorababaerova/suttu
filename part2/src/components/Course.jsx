import Header from './Header.jsx';
import Content from './Content.jsx'
import Total from './Total.jsx'


const Course = ({courses}) => {
    
    return (
        <div>
      {courses.map(course => (
        <div key={course.id}>
          <Header name={course.name} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
        </div>
      ))}
    </div>
        
    )
}

export default Course
