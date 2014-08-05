
var path = require('path');

var config = require('../config');

var Sequelize, sequelize;

global.loadService = function(functionName) {
    // 得到service的文件
    return require(path.join(config.base_path), 'services', functionName + config.script_ext);
};

global.loadModel = function(modelName) {
    var obj;

    // 得到model的文件
    var model_config = require(path.join(config.base_path, 'models', modelName + config.script_ext));
    var options = {

    }

    if (model_config.tableName) {
        options.tableName = model_config.tableName;
        delete model_config.tableName
    }

    if (!sequelize) {
        throw new Error("请配置mysql数据库，")
    }

    obj = sequelize.define(modelName.replace(/\/|\\/g, '_'), model_config, options);
    obj.db_type = 'sql';

    return obj;
};

global.loadMongoModel = function(modelName) {
    var MongoModel = mongoose.model(modelName.replace(/\//g, '_'), new Schema(require(path.join(config.base_path, 'models', modelName + config.script_ext))));
    MongoModel.db_type = 'mongo';
    return MongoModel
}

if (config.mysql_config) {
    // mysql配置和连接
    Sequelize = require('sequelize');
    global.sequelize = sequelize = new Sequelize(config.mysql_config.database, config.mysql_config.username, config.mysql_config.password, {
        define: {
            underscored: false,
            freezeTableName: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
            timestamps: false
        },
        host: config.mysql_config.host,
        maxConcurrentQueries: 120,
        logging: true
    });
    console.log('mysql尝试连接')
} else {
    console.log('mysql没有配置，不能使用sql的功能')
}

if (config.mongo_config) {
    mongoose = require('mongoose');
    var Schema = mongoose.Schema;
    mongoose.connect('mongodb://' + config.mongo_config.user + ':' + config.mongo_config.pass + '@' + config.mongo_config.host + ':' + config.mongo_config.port + '/' + config.mongo_config.database, config.mongo_config);
    console.log('mongodb尝试链接')
} else {
    console.log('mongodb没有配置，不能使用mongodb的功能');
}

global.BaseModel = require('./BaseModel.js');
