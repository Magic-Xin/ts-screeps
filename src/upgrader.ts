export default function (creep: Creep): void {
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
        let sources: Source[] = creep.room.find(FIND_SOURCES);
        let num: number = creep.memory.sourceID;
        if (creep.harvest(sources[num]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[num], { visualizePathStyle: { stroke: '#ffaa00' } });
        }
    }
}