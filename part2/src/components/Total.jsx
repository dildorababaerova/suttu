const Total = ({parts1, parts2}) => {
    // const part1= courses[0]
    // const parts1 =part1.parts

    const total1 =parts1.reduce((sum, part) =>
                sum+part.exercises,0)
    const total2 =parts2.reduce((sum, part) =>
                sum+part.exercises,0)
    
    return (
        <div>
            <div>
                <p><strong>Total of {total1} exercises
                    </strong>
                </p>
            </div>
            <div>
                <p><strong>Total of {total2} exercises
                    </strong>
                </p>
            </div>
        </div>
    )
}
export default Total