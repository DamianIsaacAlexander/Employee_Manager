const db = require('./models');

const ActionHandler = require('./actionhandler.js');

const actionhandler = new ActionHandler();

db.sequelize.sync({logging: false}).then(() => {
  actionhandler.initLoop()
    .then(() => { process.exit(); });
});
