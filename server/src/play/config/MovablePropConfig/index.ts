import type {
    IMovablePropConfig,
    IMovablePropData,
} from '../../data/MovablePropData';
import { InteractableType } from '../../const/TokenConst';

/**
 * 可移动道具配置 / Movable prop configuration
 */
export const MovablePropConfig: IMovablePropConfig = {
    data: {
        plate: {
            states: {
                clean: {
                    mesh: 'mesh/盘子.vb',
                    interactHint: '盘子（干净）',
                },
                dirty: {
                    mesh: 'mesh/盘子.vb',
                    interactHint: '盘子（脏）',
                },
            },
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
        pan: {
            states: {
                clean: {
                    mesh: 'mesh/平底锅.vb',
                    interactHint: '平底锅（干净）',
                },
                dirty: {
                    mesh: 'mesh/平底锅.vb',
                    interactHint: '平底锅（脏）',
                },
            },
            interactableConfig: {
                id: () =>
                    `pan_${Date.now()}_${Math.floor(Math.random() * 100)}`,
                token: InteractableType.PanProp,
                entityConfig: {
                    meshScale: new GameVector3(0.0625, 0.0625, 0.0625),
                    meshOrientation: new GameQuaternion(0, 0, 0, 1).rotateY(
                        Math.PI
                    ),
                },
                offset: new GameVector3(0, 0.25, 0),
            },
            wearableConfig: {
                scale: new GameVector3(1, 1, 1),
                offset: new GameVector3(0, 0, 0.75),
                orientation: new GameQuaternion(0, 0, 0, 1),
            },
        },
        pot: {
            states: {
                clean: {
                    mesh: 'mesh/锅.vb',
                    interactHint: '锅（干净）',
                },
                dirty: {
                    mesh: 'mesh/锅.vb',
                    interactHint: '锅（脏）',
                },
            },
            interactableConfig: {
                id: () =>
                    `pot_${Date.now()}_${Math.floor(Math.random() * 100)}`,

                token: InteractableType.PotProp,
                entityConfig: { meshScale: new GameVector3(0.1, 0.1, 0.1) },
                offset: new GameVector3(0, 0.25, 0),
            },
            wearableConfig: {
                scale: new GameVector3(1, 1, 1),
                offset: new GameVector3(0, 0, 0.75),
            },
        },
        bread: {
            states: {
                raw: {
                    mesh: 'mesh/面包_old.vb',
                    interactHint: '面包（生）',
                },
                chopped: {
                    mesh: 'mesh/面包_old.vb',
                    interactHint: '面包（已切）',
                },
                cooking: {
                    mesh: 'mesh/面包_old.vb',
                    interactHint: '面包（烹饪中）',
                },
            },
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
            states: {
                raw: {
                    mesh: 'mesh/牛肉.vb',
                    interactHint: '牛肉（生）',
                },
                chopped: {
                    mesh: 'mesh/已切牛肉.vb',
                    interactHint: '牛肉（已切）',
                },
                cooking: {
                    mesh: 'mesh/牛肉.vb',
                    interactHint: '牛肉（烹饪中）',
                },
            },
            interactableConfig: {
                id: () =>
                    `meat_${Date.now()}_${Math.floor(Math.random() * 100)}`,
                token: InteractableType.FoodProp,
                entityConfig: {
                    meshScale: new GameVector3(0.1, 0.1, 0.1),
                },
                offset: new GameVector3(0, 0.25, 0),
            },
            wearableConfig: {
                scale: new GameVector3(1, 1, 1),
                offset: new GameVector3(0, 0, 0.75),
            },
        },
        vegetable: {
            states: {
                raw: {
                    mesh: 'mesh/蔬菜.vb',
                    interactHint: '蔬菜（生）',
                },
                chopped: {
                    mesh: 'mesh/已切蔬菜.vb',
                    interactHint: '蔬菜（已切）',
                },
                cooking: {
                    mesh: 'mesh/蔬菜.vb',
                    interactHint: '蔬菜（烹饪中）',
                },
            },
            interactableConfig: {
                id: () =>
                    `vegetable_${Date.now()}_${Math.floor(Math.random() * 100)}`,
                token: InteractableType.FoodProp,
                entityConfig: {
                    meshScale: new GameVector3(0.1, 0.1, 0.1),
                },
                offset: new GameVector3(0, 0.25, 0),
            },
            wearableConfig: {
                scale: new GameVector3(1, 1, 1),
                offset: new GameVector3(0, 0, 0.75),
            },
        },
        tomato: {
            states: {
                raw: {
                    mesh: 'mesh/番茄_old.vb',
                    interactHint: '番茄（生）',
                },
                chopped: {
                    mesh: 'mesh/已切番茄.vb',
                    interactHint: '番茄（已切）',
                },
                cooking: {
                    mesh: 'mesh/番茄_old.vb',
                    interactHint: '番茄（烹饪中）',
                },
            },
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
        meatBurger: {} as IMovablePropData<''>,
        mixedBurger: {} as IMovablePropData<''>,
        nutritiousBurger: {} as IMovablePropData<''>,
        beefSoup: {} as IMovablePropData<''>,
    },
};
