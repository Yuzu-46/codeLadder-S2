import type { IMovablePropConfig } from '../../data/MovablePropData';
import { ContainerState } from '../../const/ContainerConst';

/**
 * 可移动道具配置 / Movable prop configuration
 */
export const MovablePropConfig: IMovablePropConfig = {
    data: {
        plate: {
            initialState: ContainerState.CLEAN,
            mesh: 'mesh/盘子.vb',
            entityConfig: {
                meshScale: new GameVector3(0.1, 0.1, 0.1),
            },
            wearableConfig: {
                scale: new GameVector3(1, 1, 1),
                offset: new GameVector3(0, 0, 0.75),
            },
        },
    },
};
