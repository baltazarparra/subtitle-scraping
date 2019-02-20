const entries = require('../entries')
const puppeteer = require('puppeteer')
const fs = require('fs')

const scraping = async () => {

  const browser = await puppeteer.launch({headless: true})
  const page = await browser.newPage()
  await page.goto(`${entries.url}${entries.loginRoute}`)

  console.log('Open login page...')
  await page.screenshot({ path: '../screens/enter.png'})

  await page.type('#UserUsername', entries.username)
  await page.type('#UserPassword', entries.password)

  console.log('Enter login info...')

  await Promise.all([
    page.click('#UserLoginForm > button'),
    page.waitForNavigation()
  ])

  console.log('Loged...')
  await page.screenshot({ path: '../screens/login.png'})

  await page.goto(`${entries.url}${entries.searchRoute}/${entries.searchTerm}`)

  console.log('Searching term...')
  await page.screenshot({ path: '../screens/searched.png'})

  const results = await page.evaluate(() => {

    const subtitlesList = Array.from(document.querySelectorAll('.gallery > article > div'))
    const subtitles = []
    subtitlesList.map((item) => {
      const name = item.querySelector('p > a').innerText
      const link = item.querySelector('p > a').href
      const img = item.querySelector('img').src
      subtitles.push({
        name,
        link,
        img
      })
    })

    return subtitles
  })

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
