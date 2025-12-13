import { render, screen } from '@testing-library/react'
import Blog from '../components/Blog'

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'didi',
    url: 'www.didi.didi',
    likes: 78787787
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText('Component testing is done with react-testing-library')
  expect(element).toBeDefined()
})