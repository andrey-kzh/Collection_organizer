const { AsyncLocalStorage } = require('async_hooks');

const localStorage = new AsyncLocalStorage();

module.exports = {
  localStorage,
};
