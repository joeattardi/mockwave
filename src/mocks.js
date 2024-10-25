import { resolve } from 'path';
import chalk from 'chalk';

import { createFastifyAdapter } from './fastify-adapter.js';

export async function loadMocks(server, mockFiles) {
    for (const mockFile of mockFiles) {
        const path = resolve(process.cwd(), mockFile);
        const { default: mock } = await import(path);
        
        console.log('\nInitializing mock:', chalk.bold(mockFile));
        console.log(chalk.yellowBright('Mock routes:'));
        if (mock.routes) {
            const adapter = createFastifyAdapter(server);
            mock.routes(adapter);
            adapter.printRoutes();
        }
    }
}
