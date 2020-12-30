'use strict';

var _ = require('lodash');

function clean () {
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
}

function structure_spawn (spawn) {
    let harvests = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    let upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    if (!spawn.spawning && spawn.room.energyAvailable >= 200) {
        if (harvests.length < 3) {
            let name = "Harvester" + Game.time;
            console.log("Spawning " + name);
            spawn.spawnCreep([WORK, CARRY, MOVE], name, { memory: { role: "harvester", sourceID: 1, upgrading: false } });
        }
        else if (upgraders.length < 2) {
            let name = "Upgrader" + Game.time;
            console.log("Spawning " + name);
            spawn.spawnCreep([WORK, CARRY, MOVE], name, { memory: { role: "upgrader", sourceID: 0, upgrading: false } });
        }
    }
}

function harvester (creep) {
    let sources = creep.room.find(FIND_SOURCES);
    let id = creep.memory.sourceID;
    if (Game.spawns["Spawn1"].store.getFreeCapacity() == 0 && creep.store.getCapacity() > 0 && !creep.pos.isNearTo(sources[id])) {
        let targets1 = creep.room.find(FIND_STRUCTURES, { filter: (structure) => { return structure.structureType == STRUCTURE_EXTENSION && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0; } });
        if (targets1.length > 0) {
            if (creep.transfer(targets1[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets1[0], { visualizePathStyle: { stroke: '#ffffff' } });
            }
        }
    }
    if (creep.store.getFreeCapacity() > 0) {
        if (creep.harvest(sources[id]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[id], { visualizePathStyle: { stroke: '#ffaa00' } });
        }
    }
    else {
        var targets2 = creep.room.find(FIND_STRUCTURES, { filter: (structure) => { return (structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_EXTENSION) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0; } });
        if (targets2.length > 0) {
            if (creep.transfer(targets2[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets2[0], { visualizePathStyle: { stroke: '#ffffff' } });
            }
        }
    }
}

function upgrader (creep) {
    if (creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
        creep.memory.upgrading = false;
        creep.say('🔄 harvest');
    }
    if (!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
        creep.memory.upgrading = true;
        creep.say('⚡ upgrade');
    }
    if (creep.memory.upgrading) {
        if (creep.room.controller != undefined) {
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#ffffff' } });
            }
        }
    }
    else {
        let sources = creep.room.find(FIND_SOURCES);
        let num = creep.memory.sourceID;
        if (creep.harvest(sources[num]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[num], { visualizePathStyle: { stroke: '#ffaa00' } });
        }
    }
}

module.exports.loop = function () {
    clean();
    structure_spawn(Game.spawns["Spawn1"]);
    for (let name in Game.creeps) {
        let creep = Game.creeps[name];
        if (creep.memory.role == "harvester") {
            harvester(creep);
        }
        if (creep.memory.role == "upgrader") {
            upgrader(creep);
        }
    }
};
