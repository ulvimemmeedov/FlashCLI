#!/usr/bin/env node
'use strict'
const Kernel = require('./kernel/kernel');
const commandList = require("./kernel/core/commandList.js");
const { exec } = require('child_process');
const paramsArr = process.argv.slice(2);
const command = paramsArr[0];
const name = paramsArr[1];

async function build() {
    exec("bash build.sh", (error, stdout, stderr) => {
        if (error) {
            console.error(error);
            return;
        }
        if (stdout) console.log(stdout);
        if (stderr) {
            console.error(stderr);
            return;
        }
    });
    exec("cp -r ./src/.env ./build", (error, stdout, stderr) => {
        if (error) {
            console.error(error);
            return;
        }
        if (stdout) console.log(stdout);
        if (stderr) {
            console.error(stderr);
            return;
        }
    });
    console.log("Build completed");
}

switch (commandList[command]) {
    case 1:
        Kernel.makeEntity(name);
        break;
    case 2:
        Kernel.makeService(name);
        break;
    case 3:
        Kernel.makeRouter(name);
        break;
    case 4:
        Kernel.makeController(name);
        break;
    case 5:
        (async () => await build())();
        break;
    case 6:
        Kernel.newProject(name);
        break;
    default:
        break;
}