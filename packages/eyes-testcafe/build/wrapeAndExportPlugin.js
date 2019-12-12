'use strict';

// This rollup plugin is meant to take the functions defined in processPageAndSerialize
// wrape them in a single function and export it.
exports.generateBundle = (_outputOptions, bundle, _isWrite) => {
  const bundleFile = bundle['captureFrameAndPoll.js'];

  bundleFile.code = `
module.exports = () => {
  ${bundleFile.code}
  return captureFrameAndPoll()
}`;
};