const {describe, it, before, after} = require('mocha');
const {expect} = require('chai');
const testServer = require('../util/testServer');
const testStorybook = require('../util/testStorybook');
const eyesStorybook = require('../../src/eyesStorybook');
const {makeGetConfig, createLogger} = require('@applitools/visual-grid-client');
const path = require('path');
const {makeTiming} = require('@applitools/monitoring-commons');
const {performance, timeItAsync} = makeTiming();

describe('eyes-storybook', () => {
  let closeStorybook;
  before(async () => {
    closeStorybook = await testStorybook({port: 9001});
  });

  after(async () => {
    closeStorybook();
  });

  let closeTestServer;
  before(async () => {
    const server = await testServer({port: 7272});
    closeTestServer = server.close;
  });

  after(async () => {
    await closeTestServer();
  });

  it('renders test storybook', async () => {
    const configPath = path.resolve(__dirname, '../fixtures');
    const cwd = process.cwd();
    process.chdir(configPath);
    const getConfig = makeGetConfig();
    process.chdir(cwd);
    const config = getConfig();
    const results = await eyesStorybook({
      config: {storybookUrl: 'http://localhost:9001', ...config},
      logger: createLogger(config.showLogs),
      performance,
      timeItAsync,
    });
    expect(
      results
        .map(r => ({name: r.getName(), isPassed: r.isPassed()}))
        .sort((a, b) => (a.name < b.name ? -1 : 1)),
    ).to.eql([
      {name: 'Button: with some emoji', isPassed: true},
      {name: 'Button: with text', isPassed: true},
      {name: 'Image: image', isPassed: true},
      {name: 'Nested/Component: story 1.1', isPassed: true},
      {name: 'Nested/Component: story 1.2', isPassed: true},
      {name: 'Nested: story 1', isPassed: true},
    ]);
  });
});
