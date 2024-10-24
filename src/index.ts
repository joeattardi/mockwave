#!/usr/bin/env node
import { readFileSync } from 'fs';
import { resolve } from 'path';

import figlet from 'figlet';
import chalk from 'chalk';

import { options } from './cli-args';
import { createServer } from './server';

const packagePath = resolve(__dirname, '../package.json');
const packageInfo = JSON.parse(readFileSync(packagePath, 'utf-8'));

async function start() {
    console.log(figlet.textSync('Mockwave'));
    console.log('Mockwave API proxy');
    console.log(`Version ${packageInfo.version}`);

    console.log(`\nProxy target: ${chalk.bold(options.target)}`);

    const server = createServer(options.target);
    await server.listen({
        port: options.port
    });
    console.log(chalk.greenBright(`\nReady for API requests on port ${chalk.bold(options.port)}.`));

    process.on('SIGINT', async () => {
        console.log('\n\nShutting down server...');
        await server.close();

        console.log('\n👋 See you next time!');
        process.exit(0);
    });
}

start();
