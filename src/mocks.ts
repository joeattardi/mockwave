import { resolve } from 'path';
import { FastifyInstance } from 'fastify';

export async function loadMocks(server: FastifyInstance, mockFiles: string[]) {
    console.log('Loading mock APIs');
    
    for (const mockFile of mockFiles) {
        const path = resolve(process.cwd(), mockFile);
        const mock = await import(path);
        // const mock = await import('/Users/joe/code/mockwave/joe.mock.mjs');
        console.log(path);
        // console.log(mock);
    }
}
