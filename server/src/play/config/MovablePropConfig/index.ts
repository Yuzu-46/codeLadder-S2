import type {
    IFoodPropData,
    IMovablePropConfig,
} from '../../data/MovablePropData';
import { ContainerState } from '../../const/ContainerConst';
import { InteractableType } from '../../const/TokenConst';
import { FoodState } from '../../const/FoodConst';

/**
 * 可移动道具配置 / Movable prop configuration
 */
export const MovablePropConfig: IMovablePropConfig = {
    data: {
        plate: {
            initialState: ContainerState.CLEAN,
            mesh: 'mesh/盘子.vb',
            interactableConfig: {
                id: () =>
                    `plate_${Date.now()}_${Math.floor(Math.random() * 100)}`,
                token: InteractableType.PlateProp,
                entityConfig: { meshScale: new GameVector3(0.1, 0.1, 0.1) },
                offset: new GameVector3(0, 0.25, 0),
            },
            wearableConfig: {
                scale: new GameVector3(1, 1, 1),
                offset: new GameVector3(0, 0, 0.75),
            },
        },
        bread: {
            initialState: FoodState.RAW,
            mesh: 'mesh/面包.vb',
            interactableConfig: {
                id: () =>
                    `bread_${Date.now()}_${Math.floor(Math.random() * 100)}`,
                token: InteractableType.FoodBoxProp,
                entityConfig: { meshScale: new GameVector3(0.1, 0.1, 0.1) },
                offset: new GameVector3(0, 0.25, 0),
            },
            wearableConfig: {
                scale: new GameVector3(1, 1, 1),
                offset: new GameVector3(0, 0, 0.75),
            },
            recipe: [],
        },
        meat: null as unknown as IFoodPropData,
        vegetable: null as unknown as IFoodPropData,
        tomato: null as unknown as IFoodPropData,
    },
};
