"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const nifty_cmd_1 = require("./nifty-cmd");
var quickRun = () => __awaiter(this, void 0, void 0, function* () {
    var cmd = new nifty_cmd_1.default("npm");
    var result = yield cmd.run();
    console.log(result.stdout);
});
var longRun = () => __awaiter(this, void 0, void 0, function* () {
    var cmd = new nifty_cmd_1.default("sort", {
        onStdErr: (data) => {
            process.stdout.write(data);
        },
        onStdOut: (data) => {
            process.stdout.write(data);
        }
    });
    var running = cmd.run();
    cmd.writeToStdin("1\n3\n2");
    cmd.writeToStdin(null);
});
var longRunLog = () => __awaiter(this, void 0, void 0, function* () {
    var cmd = new nifty_cmd_1.default("sort", { log: true });
    var running = cmd.run();
    cmd.writeToStdin("1\n3\n2");
    cmd.writeToStdin(null);
});
var kill = () => __awaiter(this, void 0, void 0, function* () {
    var cmd = new nifty_cmd_1.default("node", {
        onStdErr: (data) => {
            process.stdout.write(data);
        },
        onStdOut: (data) => {
            process.stdout.write(data);
        }
    });
    var running = cmd.run();
    cmd.kill();
});
var main = () => __awaiter(this, void 0, void 0, function* () {
    yield quickRun();
    yield longRun();
    yield longRunLog();
    yield kill();
});
main();
