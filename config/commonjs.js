const base = require(`./rollup.config.base`)
/* eslint-disable fp/no-mutating-assign */
module.exports = Object.assign({}, base, {
  dest: `./f-utility.js`,
  entry: `src/index.js`,
  format: `cjs`
})
/* eslint-enable fp/no-mutating-assign */