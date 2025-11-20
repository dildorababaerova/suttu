const _ = require('lodash')

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }  
]


const dummy = (blogs) => {
  return 1
}


const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog ) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    return blogs.length > 0 ? blogs.reduce((a,b) => (a.likes>b.likes ? a : b), blogs[0] ) :null
}

const favoriteBlogMax = (blogs) => {

    const maxLikes =Math.max(...blogs.map(blog => blog.likes))


    return blogs.find(blog => blog.likes === maxLikes).title
}


const tlikes = totalLikes(blogs)
const fblog = favoriteBlog(blogs)
const mblog = favoriteBlogMax(blogs)

console.log(tlikes)
console.log(fblog)
console.log(mblog)


const mostBlogAuthor = _
.chain(blogs)
.groupBy('author')
.map((blogs, author) => ({
        author,
        blogsCount: blogs.length,
    }))
.maxBy('blogsCount')
.value()
    

console.log('LODASH',mostBlogAuthor)


const mostBlog =(blogs) => {

    const blogsByAuthor = _.groupBy(blogs, 'author')
    console.log("blogs by authors", blogsByAuthor)
    
    const blogsByAuthorCount = _.map(blogsByAuthor, (blogs, author) => ({
        author, 
        blogsCount: blogs.length
    }))
    
    console.log('Count', blogsByAuthorCount)
    
    const maxBlogsByAuthorCount = _.maxBy(blogsByAuthorCount, 'blogsCount')
    
    
    return maxBlogsByAuthorCount
}
console.log('Max',mostBlog(blogs))



 const blogsAuthorLikes =(blogs) =>{

     const blogsByAuthor = _.groupBy(blogs, 'author')
     
     const blogsByAuthorLikes = _.map(blogsByAuthor, (blogs, author) => ({
         author, 
         blogsLikes: _.sumBy(blogs, 'likes')
     }))
     console.log('Likes', blogsByAuthorLikes)
     
     const maxBlogsByAuthorLikes = _.maxBy(blogsByAuthorLikes, 'blogsLikes')
     console.log(maxBlogsByAuthorLikes)
    
     return maxBlogsByAuthorLikes
 }

 console.log('LIKES', blogsAuthorLikes(blogs) )



module.exports = {
  dummy,
  totalLikes,
  favoriteBlogMax,
  mostBlog,
  blogsAuthorLikes,
}