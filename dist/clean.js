"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function run() {
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
}
exports.default = {
    run: run
};
