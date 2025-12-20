import { render, screen } from '@testing-library/react'
import AddBlog from '../components/AddBlog'
import userEvent from '@testing-library/user-event'

test('<AddBlog/> updates parent state and calls onSubmit', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()
  render(<AddBlog createBlog = {createBlog} /> )

  const input = screen.getAllByRole('textbox')
  const sendButton = screen.getByText('Add')
  await user.type(input[0], 'testing a form..')
  await user.type(input[1], 'test')
  await user.type(input[2], 'test.fi')
  await user.type(input[3], '11111')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0]).toEqual({
    title: 'testing a form..',
    author: 'test',
    url: 'test.fi',
    likes: 11111
  })
})

test('Add new blog with label', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()
  render(<AddBlog createBlog = {createBlog} /> )

  const sendButton = screen.getByText('Add')

  await user.type(screen.getByLabelText('title'), 'testing2 a form..')
  await user.type(screen.getByLabelText('author'), 'didi')
  await user.type(screen.getByLabelText('url'), 'test2.fi')
  await user.type(screen.getByLabelText('likes'), '10')
  await user.click(sendButton)
  expect(createBlog.mock.calls).toHaveLength(1)
  const blog =createBlog.mock.calls[0][0]

  expect(blog.title).toBe('testing2 a form..')
  expect(blog.author).toBe('didi')
  expect(blog.url).toBe('test2.fi')
  expect(blog.likes).toBe(10)
})