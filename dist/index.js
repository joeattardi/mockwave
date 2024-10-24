#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const figlet_1 = __importDefault(require("figlet"));
const chalk_1 = __importDefault(require("chalk"));
const cli_args_1 = require("./cli-args");
const server_1 = require("./server");
const packagePath = (0, path_1.resolve)(__dirname, '../package.json');
const packageInfo = JSON.parse((0, fs_1.readFileSync)(packagePath, 'utf-8'));
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(figlet_1.default.textSync('Mockwave'));
        console.log('Mockwave API proxy');
        console.log(`Version ${packageInfo.version}`);
        console.log(`\nProxy target: ${chalk_1.default.bold(cli_args_1.options.target)}`);
        const server = (0, server_1.createServer)(cli_args_1.options.target);
        yield server.listen({
            port: 8000
        });
        console.log('Server listening on port 8000');
        console.log('\nReady for API requests.');
    });
}
start();
