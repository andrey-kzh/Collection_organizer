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
        const userId = await Users.insertUser(name, login, passwordHash, salt);
        res.status(200).json(userId);
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
            const existingSession = await Sessions.selectSessionByUserId(user.id);
            if (existingSession) {
              session = await Sessions.updateLastVisit(existingSession.id);
            } else {
              const token = await Sessions.createToken(user.id);
              session = await Sessions.insertSession(user.id, token);
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
      const id = await Sessions.deleteSession(session.id);
      if (!id) throw { status: 401, message: 'Session not found' };
      res.status(200).json({ isLogout: true });
    } catch (e) {
      next(err(e));
    }
    next();
  },

  async checkAuth(req, res, next) {
    try {
      const session = await localStorage.getStore().get('session');
      if (session) {
        res.status(200).json({isAuth: true});
      } else res.status(200).json({isAuth: false})
    }
     catch (e) {
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

      if (new Date(session.lastVisit) < expires) {
        await Sessions.deleteSession(session.id);
        return next();
      }

      await localStorage.getStore().set('session', session);
      await Sessions.updateLastVisit(session.id);
    } catch (e) {
      next(err(e));
    }
    next();
  },

};
