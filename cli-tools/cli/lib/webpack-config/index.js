const path = require('path');
const validateOptions = require('schema-utils');
const schema = require('./__config/schema.json');
const generator = require('./generator');
const defaults = require('./__config/defaults');
const defaultsDeep = require('lodash.defaultsdeep');


const loadConfig = (configPath) => {
  const absConfigPath = path.resolve(configPath);
  const aoflConfig = require(absConfigPath);


  const root = aoflConfig.root || path.dirname(configPath);
  const config = defaultsDeep(aoflConfig, defaults(root));

  validateOptions(schema, config, 'AofL JS');

  return {
    ...config,
    webpack: generator(root, config)
  };
};

module.exports = {
  loadConfig
};
