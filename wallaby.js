module.exports = function configureWallaby(wallaby) {
  return {
    files: [
      `src/**/*.js`,
      `src/*.js`
    ],

    tests: [
      `tests/**/spec-*.js`,
      `tests/spec-*.js`
    ],

    env: {
      type: `node`,
      kind: `electron`
    },

    compilers: {
      '**/*.js': wallaby.compilers.babel()
    },

    testFramework: `ava`,

    setup: function setupWallaby() {
      require(`babel-polyfill`)
    },

    debug: true,
    filesWithNoCoverageCalculated: [`src/core/fs.js`]
  }
}