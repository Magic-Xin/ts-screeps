import './wheel/structercache'
import './wheel/creepmove'

import clean from './clean'
import genpixel from './genpixel'
import structure_spawn from './spawn'
import harvester from './harvester'
import upgrader from './upgrader'

module.exports.loop = function (): void {
    clean();
    genpixel();

    structure_spawn(Game.spawns["Spawn1"]);

    for (let name in Game.creeps) {
        let creep: Creep = Game.creeps[name];
        if (creep.memory.role == "harvester") {
            harvester(creep);
        }
        if (creep.memory.role == "upgrader") {
            upgrader(creep);
        }
    }
}