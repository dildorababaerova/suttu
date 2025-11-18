const Blog = ({blog}) => {
  console.log('Blog', blog);
  
  return(
    <div className="blog-item" style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
      <h2>{blog.title}</h2>
      <p><strong>Author:</strong> {blog.author}</p>
      <p><strong>URL:</strong> <a href={blog.url} target="_blank" rel="noopener noreferrer">{blog.url}</a></p>
      <p><strong>Likes:</strong> {blog.likes}</p>
    </div>
  )
}

export default Blog