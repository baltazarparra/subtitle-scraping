const puppeteer = require('puppeteer')
const fs = require('fs')
require('dotenv').config()

const scraping = async () => {

  const browser = await puppeteer.launch({headless: true})
  const page = await browser.newPage()
  await page.goto('http://legendas.tv/login')

  console.log('Open login page...')

  const login = process.env.USERNAME
  const password = process.env.PASSWORD

  await page.waitFor('#UserUsername')
  await page.type('#UserUsername', login)
  await page.waitFor('#UserPassword')
  await page.type('#UserPassword', password)

  console.log('Enter login info...')

  await Promise.all([
    page.waitForNavigation(),
    page.click('#UserLoginForm > button')
  ])

  console.log('Logged...')

  await page.goto(`http://legendas.tv/busca/${process.env.SEARCH_TERM}`)

  console.log('Searching term...')

  const results = await page.evaluate(() => {

    const subtitlesList = Array.from(document.querySelectorAll('.gallery > article > div'))
    const subtitles = []
    subtitlesList.map((item) => {
      const name = item.querySelector('p > a').innerText
      const link = item.querySelector('p > a').href
      const img = item.querySelector('img').src
      const directLink = link.replace(/download/g, '$&arquivo')
      subtitles.push({
        name,
        directLink,
        img
      })
    })

    return subtitles
  })

  console.log('Done! Json in src/subtitles.json')

  await browser.close()

  return results
}

scraping()
  .then((list) => {
    fs.appendFile('subtitles.json', JSON.stringify(list), (err) => {
      if(err) console.log(err)
    })
  })
  .catch((e) => console.log(e))
