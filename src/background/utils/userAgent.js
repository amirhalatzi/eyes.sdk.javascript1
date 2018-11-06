import UAParser from 'ua-parser-js'

const parser = new UAParser(window.navigator.userAgent)
const browserName = parser.getBrowser().name

export const isChrome = browserName === 'Chrome'

export const isFirefox = browserName === 'Firefox'
