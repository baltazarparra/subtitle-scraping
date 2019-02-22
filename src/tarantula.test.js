const puppeteer = require('puppeteer')
require('dotenv').config()

beforeAll(async () => {
  browser = await puppeteer.launch({ headless: true })
  page = await browser.newPage()
  await page.goto('http://legendas.tv/login')
})

describe('Check has selectors', () => {

  test('Has title', async () => {
    const title = await page.title()
    expect(title).toBe('Login - Legendas TV')
  })

  test('Has form', async () => {
    const form = await page.$eval('#UserLoginForm', el => el ? true : false)
    expect(form).toBe(true)
  })

  test('Has login input', async () => {
    const loginInput = await page.$eval('#UserUsername', el => el ? true : false)
    expect(loginInput).toBe(true)
  })

  test('Has password input', async () => {
    const passwordInput = await page.$eval('#UserPassword', el => el ? true : false)
    expect(passwordInput).toBe(true)
  })

  test('Has submit button', async () => {
    const submitButton = await page.$eval('#UserLoginForm .btn', el => el ? true : false)
    expect(submitButton).toBe(true)
  })

  test('Login without error', async () => {
    await page.type('#UserUsername', 'baltazarparra')
    await page.type('#UserPassword', 'zxc123')

    await Promise.all([
      page.waitForNavigation(),
      page.click('#UserLoginForm > button')
    ])

    const loginLink = await page.$eval('.login > a', el => el.textContent)
    expect(loginLink).toEqual('baltazarparra')
  }, 10000)

})

afterAll(() => {
  browser.close()
})
