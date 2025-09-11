import Header from './Header.jsx';
import Content from './Content.jsx'
import Total from './Total.jsx'


const Course = ({courses}) => {
    console.log("Courses", courses);
    const part1= courses[0]
    const part2= courses[1]
    

    console.log("part1", part1);
    console.log('partname', part1.name);
    console.log('parts', part1.parts);
    const parts1 =part1.parts
    const parts2 =part2.parts
    console.log('PARTS1',parts1);
    console.log('PARTS1',parts1);
    
    return (
        <div>
            <Header part1={part1} part2={part2}/>
            <Content parts1={parts1} parts2={parts2}/>
            <Total parts1={parts1} parts2={parts2} />
        </div>
    )
}

export default Course
