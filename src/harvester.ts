export default function (creep: Creep): void {
    let sources: Source[] = creep.room.find(FIND_SOURCES);
    let id: number = creep.memory.sourceID;

    if (Game.spawns["Spawn1"].store.getFreeCapacity() == 0 && creep.store.getCapacity() > 0 && !creep.pos.isNearTo(sources[id])) {
        let targets1: Structure[] = creep.room.find(FIND_STRUCTURES, { filter: (structure) => { return structure.structureType == STRUCTURE_EXTENSION && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0; } });

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
        var targets2: Structure[] = creep.room.find(FIND_STRUCTURES, { filter: (structure) => { return (structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_EXTENSION) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0; } });
        if (targets2.length > 0) {
            if (creep.transfer(targets2[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets2[0], { visualizePathStyle: { stroke: '#ffffff' } });
            }
        }
    }
}