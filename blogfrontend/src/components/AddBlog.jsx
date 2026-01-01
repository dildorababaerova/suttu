import { useState } from 'react'

const AddBlog = ({ createBlog }) => {
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
          <label>
            Title:
            <input
              aria-label='title'
              value={blogTitle}
              onChange={handleTitleChange} />
          </label>
        </div>
        <div>
          <label>
            Author:
            <input
              aria-label='author'
              value={blogAuthor}
              onChange={handleAuthorChange} />
          </label>
        </div>
        <div>
          <label>
            URL:
            <input
              aria-label='url'
              value={blogUrl}
              onChange={handleUrlChange} />
          </label>
        </div>
        <div>
          <label>Likes:
            <input
              aria-label='likes'
              value={blogLikes}
              onChange={handleLikesChange} />
          </label>
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  )
}
export default AddBlog