#!/usr/bin/env node

import { readFileSync } from 'fs';
import { resolve } from 'path';

import figlet from 'figlet';
import chalk from 'chalk';

import { mocks, options } from './cli-args.js';
import { createServer } from './server.js';
import { loadMocks } from './mocks.js';

const packagePath = resolve(import.meta.dirname, '../package.json');
const packageInfo = JSON.parse(readFileSync(packagePath, 'utf-8'));

async function start() {
    console.log(figlet.textSync('Mockwave'));
    console.log('Mockwave API proxy');
    console.log(`Version ${packageInfo.version}`);

    const server = createServer(options.target);

    await loadMocks(server, mocks);

    console.log(`\nAll other routes proxied to target:\n${chalk.bold(options.target)}`);

    try {
        await server.listen({
            port: options.port
        });
        console.log(chalk.greenBright(`\n>> Ready for API requests on port ${chalk.bold(options.port)}.`));
    } catch (error) {
        if (error.code === 'EADDRINUSE') {
            console.error(chalk.redBright(`⚠️  Port ${chalk.bold(options.port)} is already in use.`));
            process.exit(1);
        }

        console.error(error);
        process.exit(1);
    }

    process.on('SIGINT', async () => {
        console.log('\n\nShutting down server...');
        await server.close();

        console.log('\n👋 See you next time!');
        process.exit(0);
    });
}

start();
