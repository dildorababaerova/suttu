import Part from './Part'

const Content =({parts1, parts2}) => {
    const partsContent1=parts1.map(part =>
            <Part key={part.id} part={part} />
            )
    const partsContent2=parts2.map(part =>
            <Part key={part.id} part={part} />
            )
    
    return (
    <div>
        {partsContent1}
        {partsContent2}
    </div>
    )
}

export default Content