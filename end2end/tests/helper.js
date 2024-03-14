const loginWith = async (page, username, password) => {
  await page.getByRole('button', { name: 'log in' }).click()
  await page.getByTestId('username').fill(username)
  await page.getByTestId('password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const addBlog = async (page, title, author, url) => {
  await page.getByRole('button', { name: 'Add new blog' }).click()
  await page.getByPlaceholder('Write blogs title here').fill(title)
  await page.getByPlaceholder('Write blogs author here').fill(author)
  await page.getByPlaceholder('Write blogs url here').fill(url)
  await page.getByRole('button', { name: 'create' }).click()
  //await page.getByRole('cell', { name: title }).waitFor()
  await page.locator('td').filter({ hasText: title }).waitFor()
}

export { loginWith, addBlog }

