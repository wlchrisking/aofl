#!/usr/bin/env node
const chalk = require('chalk');
const TestProject = require('../commands/test-project');
const program = require('commander');

program
  .option('-w, --watch', 'Watches for filesystem changes.')
  .option('--stats', '')
  .option('--profile', '')
  .option('--debug', 'Switch loaders to debug mode.')
  .option('--config [path]', 'Specify the path to the config file.')
  .option('--reporter [reporter]', 'Specify a reporter [fancy, basic]')
  .option('-s, --skip-all', 'Skip generating all scripts for full coverage report')
  .on('--help', () => {
    process.stdout.write(`
  Examples:

    aofl help build
    aofl build
    NODE_ENV=production aofl build ${chalk.dim('## Will run in production mode.')}
`);
  })
  .parse(process.argv);

const testProject = new TestProject(program.config, program.watch, program.stats, program.profile,
  program.debug, program.reporter);
testProject.init();
