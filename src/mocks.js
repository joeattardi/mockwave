import { resolve } from 'path';
import chalk from 'chalk';

export async function loadMocks(server, mockFiles) {
    for (const mockFile of mockFiles) {
        const path = resolve(process.cwd(), mockFile);
        const { default: mock } = await import(path);
        
        console.log('\nInitializing mock:', chalk.bold(mockFile));
        mock(server);
    }

    console.log('\nMock routes:');
    console.log(server.printRoutes({ commonPrefix: false }));
}
