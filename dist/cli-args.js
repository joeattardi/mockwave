"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = void 0;
const path_1 = require("path");
const fs_1 = require("fs");
const commander_1 = require("commander");
const packagePath = (0, path_1.resolve)(__dirname, '../package.json');
const packageInfo = JSON.parse((0, fs_1.readFileSync)(packagePath, 'utf-8'));
commander_1.program
    .name('mockwave')
    .version(packageInfo.version)
    .option('-t, --target <target>', 'The proxy target URL.')
    .option('-p, --port <port>', 'The port to listen on.', '8000');
commander_1.program.parse();
const options = commander_1.program.opts();
exports.options = options;
