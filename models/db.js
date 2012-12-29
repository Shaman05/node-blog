//mongodb数据库的连接

var config = require('../config');
var mongo = require('../node_modules/mongodb');
var Db = mongo.Db;
var Connection = mongo.Connection;
var Server = mongo.Server;

module.exports = new Db(config.dbSettings.db, new Server(config.dbSettings.host, Connection.DEFAULT_PORT,{}));
