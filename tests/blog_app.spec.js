const { test, expect, describe, beforeEach } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', ()=> {
  beforeEach(async ({ page, request }) => {
    await
    request.post('/api/testing/reset')
    await request.post('/api/users', 
    {
      data: {
        name: 'Matti Luukkainen',
        username:'mluukkai',
        password: 'salainen'
      }
    })
  await page.goto('/')
  })

  test('front page can be opened', async ({ page }) => {
  
    const locator = page.getByText('Blogs')
    await expect(locator).toBeVisible()
    await expect(page.getByText('Blog app, Department of Computer Science, University of Helsinki 2025')).toBeVisible()
  })
  test('user can log in', async ({ page }) => {

    await loginWith(page, 'mluukkai', 'salainen' )

    // const textboxes = await page.getByRole('textbox').all()
    // await textboxes[0].fill('didi')
    // await textboxes[1].fill('react')
    await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
  })
  test('login fails with wrong password', async ({ page }) => {
    await loginWith(page, 'mluukkai', 'wrong')

    await expect(page.getByText('invalid username or password')).toBeVisible()
  })

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'test', 'author test', 'test.fi', '111')
     
      await expect(page.getByRole('heading', { name: 'test' })).toBeVisible()

      const blog= page.locator('.blog-item').filter({ hasText: 'test' })
      await blog.getByRole('button', { name: 'view' }).click()
      await expect(page.getByText('author test')).toBeVisible()
    })
      describe('several blogs exists', () => {
        beforeEach(async({page}) => {
          const blogs = [
            {title: 'test1', author: 'author1', url: 'test1.fi', likes: '111'},
            {title: 'test2', author: 'author2', url: 'test2.fi', likes: '112'},
            {title: 'test3', author: 'author3', url: 'test3.fi', likes: '113'},
          ]
          
          for (const blog of blogs) {
            await createBlog(page, blog.title, blog.author, blog.url, blog.likes)
            await expect(page.getByRole('heading', { name: blog.title })).toBeVisible()
          };
        })
        test('one of those can be visible details', async ({page}) =>{
          const otherBlogElement = page.locator('.blog-item').filter({ has: page.getByRole('heading', { name: 'test2' }) })
          await expect(otherBlogElement).toBeVisible()
          await otherBlogElement.getByRole('button', { name: 'view' }).click()
          await expect(otherBlogElement.getByText('112')).toBeVisible()
        }
        )
        test('remove one blog', async ({page}) => {
          const initialCount = await page.locator('.blog-item').count()
          console.log('INITIAL BLOGS:', initialCount);
          const otherBlogElement = page.locator('.blog-item').filter({ has: page.getByRole('heading', { name: 'test2' }) })
          await otherBlogElement.getByRole('button', { name: 'view' }).click()
          page.once('dialog', dialog => dialog.accept())
          await otherBlogElement.getByRole('button', { name: 'remove' }).click()
          await expect(otherBlogElement).not.toBeVisible({ timeout: 5000 })
          await expect(page.locator('.blog-item')).toHaveCount(initialCount-1)
        })
        test('cancel blog deletion when dialog is dismissed', async ({page}) => {
          const initialCount = await page.locator('.blog-item').count()
          
          const blogToDelete = page.locator('.blog-item').filter({ 
            has: page.getByRole('heading', { name: 'test2' }) 
          })
          
          await blogToDelete.getByRole('button', { name: 'view' }).click()
          
          // На этот раз отклоняем диалог
          page.once('dialog', dialog => {
            console.log('Диалог отклонен')
            dialog.dismiss() // вместо accept()
          })
          
          await blogToDelete.getByRole('button', { name: 'remove' }).click()
          
          // Ждем и проверяем, что блог НЕ удалился
          await page.waitForTimeout(1000)
          await expect(page.locator('.blog-item')).toHaveCount(initialCount)
          await expect(page.getByRole('heading', { name: 'test2' })).toBeVisible()
        })

        test('blogs are in correct order after operations', async ({page}) => {
          // Создадим еще один блог с большим количеством лайков
          await createBlog(page, 'most liked', 'popular author', 'popular.fi', '999')
          await expect(page.getByRole('heading', { name: 'most liked' })).toBeVisible()
          
          // Проверим порядок (если у вас есть сортировка по лайкам)
          const firstBlog = page.locator('.blog-item').first()
          await expect(firstBlog.getByRole('heading')).toHaveText('most liked')
        })
        test('likes change blog order', async ({page}) => {
          // Найдем блог test1 (самый маленький)
          const blogTest1 = page.locator('.blog-item', {
            has: page.getByRole('heading', { name: 'test1' })
          })
          
          // Открываем детали
          await blogTest1.getByRole('button', { name: 'view' }).click()
          
          // Добавляем много лайков, чтобы test1 стал первым
          const likeButton = blogTest1.getByRole('button', { name: 'likes' })
          
          // Добавляем 100 лайков
          for (let i = 0; i < 100; i++) {
            await likeButton.click()
            // Небольшая пауза между кликами
            await page.waitForTimeout(10)
          }
          
          // Ждем обновления UI
          await page.waitForTimeout(1000)
          
          // Теперь test1 должен быть первым
          const firstBlog = page.locator('.blog-item').first()
          await expect(firstBlog.getByRole('heading')).toHaveText('test1')
          
          // Проверяем, что у test1 теперь 111 + 100 = 211 лайков
          await expect(blogTest1.getByText('211')).toBeVisible()
        })
      })
    })
  })