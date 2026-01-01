const loginWith = async (page, username, password)  => {
  await page.getByRole('button', { name: 'login' }).click()
  await page.getByLabel('username').fill(username)
  await page.getByLabel('password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async(page, title, author, url, likes) => {
    await page.getByRole('button', { name: 'add new blog' }).click()
      await page.getByLabel('title').fill(title)
      await page.getByLabel('author').fill(author)
      await page.getByLabel('url').fill(url)
      await page.getByLabel('likes').fill(likes)
      await page.getByRole('button', { name: 'Add' }).click()
}

export { loginWith, createBlog }