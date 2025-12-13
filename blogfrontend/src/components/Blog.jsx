import { useRef } from 'react'
import Togglable from './Togglable'

const Blog = ({ blog, handleLikes, handleDelete }) => {
  // console.log('Blog', blog);
  const blogRef =useRef()

  return(
    <div className="blog-item"
      style={
        {
          border: '1px solid #ccc',
          background: '#e6e1e1ff',
          borderRadius: '10px',
          margin: '10px',
          padding: '10px'
        }}>

      <h2>{blog.title}</h2>
      <Togglable buttonLabel ='view' ref= {blogRef}>
        <button onClick= {() => blogRef.current.toggleVisibility()}>hide</button>
        <p><strong>Author:</strong> {blog.author}</p>
        <p><strong>URL:</strong> <a href={blog.url} target="_blank" rel="noopener noreferrer">{blog.url}</a></p>
        <p><strong>Likes:</strong> {blog.likes}
          <button onClick = {() => handleLikes(blog.id)}>likes</button>
        </p>
        <button onClick={() => {handleDelete(blog.id)}}>remove</button>
      </Togglable>
    </div>
  )
}

export default Blog