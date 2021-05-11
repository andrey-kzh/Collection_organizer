const jwt = require('jsonwebtoken');
const { db } = require('../libs/connection');
const config = require('../config');

module.exports = {

  async insertSession(userId, token) {
    if (!token || !userId) return false;
    return db.oneOrNone(
      'INSERT INTO sessions (user_id, token, last_visit) VALUES ($1, $2, $3) RETURNING token',
      [userId, token, new Date().toISOString()],
    )
      .then((data) => data)
      .catch((error) => {
        throw error;
      });
  },

  selectSessionByUserId(userId) {
    return db.oneOrNone(
      'SELECT id FROM sessions WHERE user_id = $1', userId,
    )
      .then((data) => data)
      .catch((error) => {
        // throw error;
      });
  },

  updateLastVisit(id) {
    return db.oneOrNone(
      'UPDATE sessions SET last_visit = $1 WHERE id = $2 RETURNING token',
      [new Date().toISOString(), id],
    )
      .then((data) => data)
      .catch((error) => {
        throw error;
      });
  },

  deleteSession(id) {
    return db.oneOrNone(
      'DELETE FROM sessions WHERE id = $1 RETURNING id', id,
    )
      .then((data) => data)
      .catch((error) => {
        throw error;
      });
  },

  createToken(userId) {
    return new Promise((resolve, reject) => {
      if (!userId) reject(false);
      const payload = { userId };
      resolve(jwt.sign(payload, config.jwtSecretKey));
    });
  },

  selectSessionByToken(token) {
    return db.oneOrNone(
      'SELECT sessions.id, sessions.user_id, sessions.token, sessions.last_visit, users.name, users.login '
            + 'FROM sessions LEFT JOIN users ON sessions.user_id = users.id WHERE token = $1', token,
    )
      .then((data) => data)
      .catch((error) => {
        // throw error;
      });
  },

};
