import Fastify from 'fastify';
import proxy from '@fastify/http-proxy';

export function createServer(proxyTarget: string) {
    const server = Fastify();

    server.register(proxy, {
        upstream: proxyTarget
    });

    return server;
}
