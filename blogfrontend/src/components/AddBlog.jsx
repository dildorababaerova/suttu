const AddBlog = ({
  addBlog,
blogTitle, 
handleTitleChange,
blogAuthor,
handleAuthorChange,
blogUrl,
handleUrlChange,
blogLikes,
handleLikesChange
}) => (
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

export default AddBlog