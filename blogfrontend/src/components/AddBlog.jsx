import {useState} from 'react'

const AddBlog = ({createBlog}) => {
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')
  const [blogLikes, setBlogLikes] = useState('') // теперь как строка

  const addBlog =(event) => {
    event.preventDefault()
    createBlog({
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl,
      likes: Number(blogLikes) || 0 // преобразуем строку в число
    })
    setBlogTitle('')
    setBlogAuthor('')
    setBlogUrl('')
    setBlogLikes('')
  }

  const handleTitleChange = (event) => setBlogTitle(event.target.value)
  const handleAuthorChange = (event) => setBlogAuthor(event.target.value)
  const handleUrlChange = (event) => setBlogUrl(event.target.value)
  const handleLikesChange = (event) => setBlogLikes(event.target.value)
  
  return (
    <div>
        <form onSubmit={addBlog}>
        <div>
          <label>Title:</label>
          <input value={blogTitle} onChange={handleTitleChange} />
        </div>
        <div>
          <label>Author:</label>
          <input value={blogAuthor} onChange={handleAuthorChange} />
        </div>
        <div>
          <label>URL:</label>
          <input value={blogUrl} onChange={handleUrlChange} />
        </div>
        <div>
          <label>Likes:</label>
          <input value={blogLikes} onChange={handleLikesChange} />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
)
}
export default AddBlog