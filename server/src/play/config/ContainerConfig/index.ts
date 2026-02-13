import type { IContainerConfig } from '../../data/ContainerData';

/**
 * 容器配置 / Container configuration
 */
export const ContainerConfig: IContainerConfig = {
    data: {
        plate: {
            clean: {
                canHoldFood: true,
                canBeCleaned: true,
                canBePlacedOnTable: true,
                canBePlacedOnStove: false,
            },
            dirty: {
                canHoldFood: true,
                canBeCleaned: true,
                canBePlacedOnTable: true,
                canBePlacedOnStove: false,
            },
        },
        pan: {
            clean: {
                canHoldFood: true,
                canBeCleaned: true,
                canBePlacedOnTable: false,
                canBePlacedOnStove: true,
            },
            dirty: {
                canHoldFood: true,
                canBeCleaned: true,
                canBePlacedOnTable: false,
                canBePlacedOnStove: true,
            },
        },
        pot: {
            clean: {
                canHoldFood: true,
                canBeCleaned: true,
                canBePlacedOnTable: false,
                canBePlacedOnStove: true,
            },
            dirty: {
                canHoldFood: true,
                canBeCleaned: true,
                canBePlacedOnTable: false,
                canBePlacedOnStove: true,
            },
        },
    },
};
