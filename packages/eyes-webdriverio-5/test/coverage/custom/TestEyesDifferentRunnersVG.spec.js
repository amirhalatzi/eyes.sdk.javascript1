
'use strict'
const {
  BrowserType,
  MatchLevel,
} = require('../../../index')
const {getDriver, getEyes} = require('./util/TestSetup')
const {testSetup, getCheckSettings, validateVG} = require('./util/EyesDifferentRunners')

describe('TestEyesDifferentRunners VG', () => {
  afterEach(async function () {
    await this.browser.deleteSession()
    await this.eyes.abortIfNotClosed()
  })

  beforeEach(async function() {
    this.browser = await getDriver('CHROME')
    this.eyes = await getEyes('VG')
    let conf = this.eyes.getConfiguration()
    conf.setTestName(`Top Sites - ${this.currentTest.title}`)
    conf.setAppName(`Top Sites`)
    conf.addBrowser(800, 600, BrowserType.CHROME)
    conf.addBrowser(700, 500, BrowserType.FIREFOX)
    conf.addBrowser(1200, 800, BrowserType.IE_10)
    conf.addBrowser(1200, 800, BrowserType.IE_11)
    this.eyes.setConfiguration(conf)
    this.eyes.setSaveNewTests(false)
    await this.eyes.open(this.browser)
  })

  let testCase = testSetup(getCheckSettings, validateVG)
  let cases = [
    ['https://amazon.com', MatchLevel.Layout],
    ['https://applitools.com/docs/topics/overview.html', MatchLevel.Strict],
    ['https://applitools.com/features/frontend-development', MatchLevel.Strict],
    ['https://docs.microsoft.com/en-us/', MatchLevel.Strict],
    ['https://ebay.com', MatchLevel.Layout],
    ['https://facebook.com', MatchLevel.Strict],
    ['https://google.com', MatchLevel.Strict],
    ['https://instagram.com', MatchLevel.Strict],
    ['https://twitter.com', MatchLevel.Strict],
    ['https://wikipedia.org', MatchLevel.Strict],
    [
      'https://www.target.com/c/blankets-throws/-/N-d6wsb?lnk=ThrowsBlankets%E2%80%9C,tc',
      MatchLevel.Strict,
    ],
    // ['https://youtube.com', MatchLevel.Layout],
  ]
  cases.forEach(testData => {
    it(testData[0], testCase(...testData))
  })
})
