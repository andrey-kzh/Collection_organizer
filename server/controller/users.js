const Users = require('../model/users');
const Sessions = require('../model/sessions');
const err = require('../libs/exception').errorCreator;
const { localStorage } = require('../libs/asyncLocalStorage');
const config = require('../config');

module.exports = {

  async register(req, res, next) {
    try {
      const { name, login, password } = req.body;
      if (name && login && password) {
        const salt = await Users.generateSalt();
        const passwordHash = await Users.generatePassword(salt, password);
        const user = await Users.addNewUser(name, login, passwordHash, salt);
        res.status(200).json(user);
      } else throw { status: 400, message: 'Incorrect request data' };
    } catch (e) {
      next(err(e));
    }
    next();
  },

  async login(req, res, next) {
    try {
      const { login, password } = req.body;
      if (login && password) {
        const user = await Users.selectUser(login);
        if (user) {
          const isLogin = await Users.checkPassword(user.salt, password, user.password);
          if (isLogin) {
            let session;
            const existingSession = await Sessions.selectSessionByUserId(user.id_user);
            if (existingSession) {
              session = await Sessions.updateLastVisit(existingSession.id_session);
            } else {
              const token = await Sessions.createToken(user.id_user);
              session = await Sessions.addNewSession(user.id_user, token);
            }
            res.status(200).json({ token: session.token });
          } else throw { status: 401, message: 'User not found' };
        } else throw { status: 401, message: 'User not found' };
      } else throw { status: 400, message: 'Incorrect request data' };
    } catch (e) {
      next(err(e));
    }
    next();
  },

  async logout(req, res, next) {
    try {
      const session = await localStorage.getStore().get('session');
      if (!session) throw { status: 401, message: 'Unauthorized' };
      const sessionId = await Sessions.delete(session.id_session);
      if (!sessionId) throw { status: 401, message: 'Session not found' };
      res.status(200).json({ result: true });
    } catch (e) {
      next(err(e));
    }
    next();
  },

  async authorization(req, res, next) {
    try {
      const header = req.get('Authorization');
      if (!header) return next();

      const token = header.split(' ')[1];
      if (!token) return next();

      const session = await Sessions.selectSessionByToken(token);
      if (!session) return next();

      const expires = new Date();
      expires.setDate(expires.getDate() - config.sessionExpirationDays);

      if (new Date(session.last_visit) < expires) {
        await Sessions.delete(session.id_session);
        return next();
      }

      await localStorage.getStore().set('session', session);
      await Sessions.updateLastVisit(session.id_session);
    } catch (e) {
      next(err(e));
    }
    next();
  },

};
