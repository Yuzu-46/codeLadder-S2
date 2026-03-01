import type { IContainerConfig } from '../../data/ContainerData';

/**
 * 容器配置 / Container configuration
 */
export default {
    data: {
        plate: {
            clean: {
                canHoldFood: true,
                canBeCleaned: true,
                canBePlacedOnTable: true,
                canBePlacedOnStove: false,
                canCook: false,
            },
            dirty: {
                canHoldFood: true,
                canBeCleaned: true,
                canBePlacedOnTable: true,
                canBePlacedOnStove: false,
                canCook: false,
            },
        },
        pan: {
            clean: {
                canHoldFood: true,
                canBeCleaned: true,
                canBePlacedOnTable: true,
                canBePlacedOnStove: true,
                canCook: true,
            },
            dirty: {
                canHoldFood: true,
                canBeCleaned: true,
                canBePlacedOnTable: true,
                canBePlacedOnStove: true,
                canCook: false,
            },
        },
        pot: {
            clean: {
                canHoldFood: true,
                canBeCleaned: true,
                canBePlacedOnTable: true,
                canBePlacedOnStove: true,
                canCook: true,
            },
            dirty: {
                canHoldFood: true,
                canBeCleaned: true,
                canBePlacedOnTable: true,
                canBePlacedOnStove: true,
                canCook: false,
            },
        },
    },
} as IContainerConfig;
