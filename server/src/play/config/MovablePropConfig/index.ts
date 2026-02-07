import type {
    IMovablePropConfig,
    IMovablePropData,
} from '../../data/MovablePropData';
import { ContainerState } from '../../const/ContainerConst';
import { InteractableType } from '../../const/TokenConst';
import { IngredientState } from '../../const/FoodConst';

/**
 * 可移动道具配置 / Movable prop configuration
 */
export const MovablePropConfig: IMovablePropConfig = {
    data: {
        plate: {
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
            interactableConfig: {
                id: () =>
                    `bread_${Date.now()}_${Math.floor(Math.random() * 100)}`,
                token: InteractableType.FoodProp,
                entityConfig: {
                    meshScale: new GameVector3(0.1, 0.1, 0.1),
                    meshOrientation: new GameQuaternion(0, 0, 0, 1).rotateZ(
                        Math.PI / 2
                    ),
                },
                offset: new GameVector3(0, 0.25, 0),
            },
            wearableConfig: {
                scale: new GameVector3(1, 1, 1),
                offset: new GameVector3(0, 0, 0.75),
                orientation: new GameQuaternion(0, 0, 0, 1).rotateZ(
                    Math.PI / 2
                ),
            },
        },
        meat: {
            interactableConfig: {
                id: () =>
                    `meat_${Date.now()}_${Math.floor(Math.random() * 100)}`,
                token: InteractableType.FoodProp,
                entityConfig: {
                    meshScale: new GameVector3(0.1, 0.1, 0.1),
                    meshOrientation: new GameQuaternion(0, 0, 0, 1).rotateZ(
                        Math.PI / 2
                    ),
                },
                offset: new GameVector3(0, 0.25, 0),
            },
            wearableConfig: {
                scale: new GameVector3(1, 1, 1),
                offset: new GameVector3(0, 0, 0.75),
                orientation: new GameQuaternion(0, 0, 0, 1).rotateZ(
                    Math.PI / 2
                ),
            },
        },
        vegetable: {
            interactableConfig: {
                id: () =>
                    `vegetable_${Date.now()}_${Math.floor(Math.random() * 100)}`,
                token: InteractableType.FoodProp,
                entityConfig: {
                    meshScale: new GameVector3(0.1, 0.1, 0.1),
                    meshOrientation: new GameQuaternion(0, 0, 0, 1).rotateZ(
                        Math.PI / 2
                    ),
                },
                offset: new GameVector3(0, 0.25, 0),
            },
            wearableConfig: {
                scale: new GameVector3(1, 1, 1),
                offset: new GameVector3(0, 0, 0.75),
                orientation: new GameQuaternion(0, 0, 0, 1).rotateZ(
                    Math.PI / 2
                ),
            },
        },
        tomato: {
            interactableConfig: {
                id: () =>
                    `tomato_${Date.now()}_${Math.floor(Math.random() * 100)}`,
                token: InteractableType.FoodProp,
                entityConfig: {
                    meshScale: new GameVector3(0.1, 0.1, 0.1),
                    meshOrientation: new GameQuaternion(0, 0, 0, 1).rotateZ(
                        Math.PI / 2
                    ),
                },
                offset: new GameVector3(0, 0.25, 0),
            },
            wearableConfig: {
                scale: new GameVector3(1, 1, 1),
                offset: new GameVector3(0, 0, 0.75),
                orientation: new GameQuaternion(0, 0, 0, 1).rotateZ(
                    Math.PI / 2
                ),
            },
        },
    },
};
