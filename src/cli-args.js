import { resolve } from 'path';
import { readFileSync } from 'fs';

// import commander, { program } from 'commander';
import * as commander from 'commander';

const packagePath = resolve(import.meta.dirname, '../package.json');
const packageInfo = JSON.parse(readFileSync(packagePath, 'utf-8'));

function parsePort(value) {
    const parsed = parseInt(value);

    if (isNaN(parsed)) {
        throw new commander.InvalidArgumentError('Port must be a number.');
    }

    return parsed;
}

commander.program
    .name('mockwave')
    .version(packageInfo.version)
    .requiredOption('-t, --target <target>', 'The proxy target URL.')
    .option('-p, --port <port>', 'The port to listen on.', parsePort, 8000)
    .argument('<mocks>', 'The mock definition file to use.')

commander.program.parse();
const options = commander.program.opts();
const mocks = commander.program.args;

export { mocks, options };
