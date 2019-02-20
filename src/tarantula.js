const entries = require('../entries')
const puppeteer = require('puppeteer')

const scraping = async () => {
  const browser = await puppeteer.launch({headless: true})
  const page = await browser.newPage()
  await page.goto(`${entries.url}${entries.loginRoute}`)

  console.log('Entering in site...')
  await page.screenshot({ path: '../screens/enter.png'})

  await page.type('#UserUsername', entries.username)
  await page.type('#UserPassword', entries.password)

  console.log('Loging...')
  await Promise.all([
    page.click('#UserLoginForm > button'),
    page.waitForNavigation()
  ])

  console.log('Loged...')
  await page.screenshot({ path: '../screens/login.png'})

  console.log('Searching...')
  await page.goto(`${entries.url}${entries.searchRoute}${entries.searchTerm}`)

  console.log('Searched...')
  await page.screenshot({ path: '../screens/searched.png'})

  await browser.close()

}

scraping()
  .then((item) => console.log('Done'))
  .catch((e) => console.log(e))
