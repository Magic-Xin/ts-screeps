import * as _ from "lodash";

export default function (spawn: StructureSpawn): void {
    let harvests: Creep[] = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    let upgraders: Creep[] = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    if (!spawn.spawning && spawn.room.energyAvailable >= 200) {
        if (harvests.length < 3) {
            let name: string = "Harvester" + Game.time;
            console.log("Spawning " + name);
            spawn.spawnCreep([WORK, CARRY, MOVE], name, { memory: { role: "harvester", sourceID: 1, upgrading: false } });
        }
        else if (upgraders.length < 2) {
            let name: string = "Upgrader" + Game.time;
            console.log("Spawning " + name);
            spawn.spawnCreep([WORK, CARRY, MOVE], name, { memory: { role: "upgrader", sourceID: 0, upgrading: false } });
        }
    }
}