const puppeteer = require('puppeteer')
require('dotenv').config()

let browser
let page

beforeAll(async () => {
  browser = await puppeteer.launch({ headless: false })
  page = await browser.newPage()
  await page.goto('http://legendas.tv/login')
})

describe('Testing scraping flow', () => {

  test('Has title', async () => {
    const title = await page.title()
    expect(title).toBe('Login - Legendas TV')
  }, 20000)

  test('Has form', async () => {
    const form = await page.$eval('#UserLoginForm', el => el ? true : false)
    expect(form).toBe(true)
  }, 20000)

  test('Has login input', async () => {
    const loginInput = await page.$eval('#UserUsername', el => el ? true : false)
    expect(loginInput).toBe(true)
  }, 20000)

  test('Has password input', async () => {
    const passwordInput = await page.$eval('#UserPassword', el => el ? true : false)
    expect(passwordInput).toBe(true)
  }, 20000)

  test('Has submit button', async () => {
    const submitButton = await page.$eval('#UserLoginForm .btn', el => el ? true : false)
    expect(submitButton).toBe(true)
  }, 20000)

  test('Login without error', async () => {
    await page.type('#UserUsername', 'baltazarparra')
    await page.type('#UserPassword', 'zxc123')

    await Promise.all([
      page.waitForNavigation(),
      page.click('#UserLoginForm > button')
    ])

    const loginLink = await page.$eval('.login > a', el => el.textContent)
    expect(loginLink).toEqual('baltazarparra')
  }, 20000)

  test('Has search input', async () => {
    const searchInput = await page.$eval('#search-box', el => el ? true : false)
    expect(searchInput).toBe(true)
  }, 20000)

  test('Has search submit', async () => {
    const searchSubmit = await page.$eval('.icon_zoom', el => el ? true : false)
    expect(searchSubmit).toBe(true)
  }, 20000)

  test('Search is working', async () => {
    await page.type('#search-box', 'hannibal')
    await page.keyboard.press('Enter')
    await page.waitFor('.number_1')
    const hasSubtitle = await page.$eval('.number_1', el => el ? true : false)
    expect(hasSubtitle).toBe(true)
  }, 40000)
})

afterAll(() => {
  browser.close()
})
