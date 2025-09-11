const Header = ({part1, part2}) => {
    console.log("PART1_NAME",part1.name)
    const part1Name=part1.name
    const part2Name=part2.name
    return (
        <div>
            <h1>{part1Name}</h1>
            <h1>{part2Name}</h1>
        </div>
    )
}

export default Header