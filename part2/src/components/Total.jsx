const Total = ({course}) => {
    console.log("Total",course.parts);
    
    return (
        <div>
            <p><strong>Total of {course.parts.reduce((sum, part) =>
                sum+part.exercises,0)} exercises
                </strong>
            </p>
        </div>
    )
}
export default Total