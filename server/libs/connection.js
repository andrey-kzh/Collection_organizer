const base = require('../config').db;
const pgp = require('pg-promise')(
  {
    receive(data) {
      camelizeColumnNames(data);
    },
  },
);

function camelizeColumnNames(data) {
  const names = Object.keys(data[0]);
  const camels = names.map((name) => pgp.utils.camelize(name));
  data.forEach((d) => {
    names.forEach((name, i) => {
      const camel = camels[i];
      if (!(camel in d)) {
        d[camel] = d[name];
        delete d[name];
      }
    });
  });
}

module.exports.db = pgp(`postgres://${base.user}:${base.password}@${base.host}:${base.port}/${base.name}`);
