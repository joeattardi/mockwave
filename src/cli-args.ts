import { resolve } from 'path';
import { readFileSync } from 'fs';

import commander, { program } from 'commander';

const packagePath = resolve(__dirname, '../package.json');
const packageInfo = JSON.parse(readFileSync(packagePath, 'utf-8'));

function parsePort(value: string) {
    const parsed = parseInt(value);

    if (isNaN(parsed)) {
        throw new commander.InvalidArgumentError('Port must be a number.');
    }

    return parsed;
}

program
    .name('mockwave')
    .version(packageInfo.version)
    .requiredOption('-t, --target <target>', 'The proxy target URL.')
    .option('-p, --port <port>', 'The port to listen on.', parsePort, 8000)
    .argument('<mockfile>', 'The mock definition file to use.')

program.parse();
const options = program.opts();

export { options };
