import { resolve } from 'path';

export async function loadMocks(server, mockFiles) {
    console.log('Loading mock APIs');
    
    for (const mockFile of mockFiles) {
        const path = resolve(process.cwd(), mockFile);
        const { default: mock } = await import(path);
        console.log(mock);
    }
}
