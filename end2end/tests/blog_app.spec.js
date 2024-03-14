const { test, describe, expect, beforeEach } = require('@playwright/test')
const { loginWith, addBlog } = require('./helper')
const exp = require('constants')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Laura Fal',
        username: 'lafale',
        password: 'salainen'
      }
    })
    await request.post('/api/users', {
      data: {
        name: 'Laura Fall',
        username: 'laff',
        password: 'salainen2'
      }
    })
    await page.goto('')
  })

  test('Login form is shown', async ({ page }) => {
    const locator = await page.getByRole('button', { name: 'Log in' })
    await expect(locator).toBeVisible()
  })
  describe('Login', () => {
    test('Fails with wrong password', async ({ page }) => {
      await loginWith(page, 'lafale', 'wrong')
      await expect(page.getByText('invalid username or password')).toBeVisible()
      const errorDiv = await page.locator('.error')
      await expect(errorDiv).toContainText('invalid username or password')
      await expect(errorDiv).toHaveCSS('border-style', 'solid')
      await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')
      await expect(page.getByText('Laura Fal is logged in')).not.toBeVisible()
    })
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'lafale', 'salainen')
      await expect(page.getByText('Laura Fal is logged in')).toBeVisible()
    })
  })
  describe('After logging in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'lafale', 'salainen')
    })
    test('a new blog can be created', async ({ page }) => {
      await addBlog(page, 'Playwright is fun', 'LauraTes', 'Playwright.fun')
      await expect(
        page.getByRole('cell', { name: 'Playwright is fun' })
      ).toBeVisible()
    })
    describe('When a blog exists', () => {
      beforeEach(async ({ page }) => {
        await addBlog(
          page,
          'Playwright is even more fun',
          'LauraTes',
          'play.fun'
        )
      })
      test('it can be liked', async ({ page }) => {
        await page.getByRole('button', { name: 'view' }).click()
        await page.getByRole('button', { name: 'Like' }).click()
        await expect(page.getByText('Likes: 1')).toBeVisible()
      })
      test('it can be removed', async ({ page }) => {
        page.on('dialog', dialog => dialog.accept())
        await page.getByRole('button', { name: 'view' }).click()
        await page.getByRole('button', { name: 'Remove' }).click()
        await expect(
          page.getByRole('cell', { name: 'Playwright is even more fun' })
        ).not.toBeVisible()
      })
      test('but not by other users', async ({ page }) => {
        await page.getByRole('button', { name: 'logout' }).click()
        await loginWith(page, 'laff', 'salainen2')
        await page.getByRole('button', { name: 'view' }).click()
        await expect(
          page.getByRole('cell', {
            name: 'Playwright is even more fun'
          })
        ).toBeVisible()
        await expect(
          page.getByRole('button', { name: 'Remove' })
        ).not.toBeVisible()
      })
    })
  })
  describe('When theres many blogs', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'lafale', 'salainen')
      await addBlog(page, 'Playwright is fun', 'LauraTes', 'Playwright.fun')
      await addBlog(page, 'Playwright is even more fun', 'LauraTes', 'play.fun')
      await addBlog(
        page,
        'Playwright is super fun',
        'LauraTes',
        'Playwright.fun.fun'
      )
    })
    test('they can be liked many times', async ({ page }) => {
      await page
        .getByRole('cell', { name: 'Playwright is even more fun' })
        .getByRole('button', { name: 'view' })
        .click()
      await page.getByRole('button', { name: 'Like' }).click()
      await expect(page.getByText('1 Like')).toBeVisible()
      await page.getByRole('button', { name: 'Like' }).click()
      await expect(page.getByText('2 Like')).toBeVisible()

      await page
        .getByRole('cell', { name: 'Playwright is super fun' })
        .getByRole('button', { name: 'view' })
        .click()
      await page
        .getByRole('cell', { name: '0 Like' })
        .getByRole('button', { name: 'Like' })
        .click()
      await expect(page.getByText('1 Like')).toBeVisible()

      const blogTitles = await page.$$eval(
        'tbody:first-child tr:first-child td:first-child',
        tds => tds.map(td => td.textContent)
      )
      const expectedOrder = [
        'Playwright is even more fun hide',
        'Playwright is super fun hide',
        'Playwright is fun view'
      ]
      expect(blogTitles).toEqual(expectedOrder)

      // const allTitles = await page.getByRole('cell').allInnerTexts()
      // const eka = await allTitles[0]
      // console.log(eka)
      // console.log(allTitles)
      // expect(eka).toEqual('Playwright is even more funhide')
    })
  })
})
