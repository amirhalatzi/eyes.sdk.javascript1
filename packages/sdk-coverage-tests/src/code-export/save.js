const fs = require('fs')
const path = require('path')

async function createTestFiles(emittedTests, sdkImplementation) {
  const targetDirectory = path.join(process.cwd(), sdkImplementation.out)
  fs.rmdirSync(targetDirectory, {recursive: true})
  fs.mkdirSync(targetDirectory, {recursive: true})

  emittedTests.forEach(test => {
    const payload = sdkImplementation.testFrameworkTemplate(test)
    const filePath = path.resolve(targetDirectory, `${test.name}${sdkImplementation.ext}`)
    fs.writeFileSync(filePath, payload)
  })
}

module.exports = {
  createTestFiles,
}
