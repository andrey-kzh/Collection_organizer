module.exports = {
  errorCreator({ status = null, message = null, code = null }) {
    if (!status) status = 500;
    if (!message) message = 'Something broke';

    return {
      status,
      code,
      message,
    };
  },
};
