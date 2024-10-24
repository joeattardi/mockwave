"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = createServer;
const fastify_1 = __importDefault(require("fastify"));
const http_proxy_1 = __importDefault(require("@fastify/http-proxy"));
function createServer(proxyTarget) {
    const server = (0, fastify_1.default)();
    server.register(http_proxy_1.default, {
        upstream: proxyTarget
    });
    return server;
}
