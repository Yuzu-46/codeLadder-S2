import type {
    FoodBoxPropConfig,
    IInteractableData,
} from '../../data/InteractableData';
import { InteractableType } from '../TokenConst';
import type { FoodType } from '../FoodConst';

/**
 * 桌子位置 / Table positions
 * @property x - x坐标 / x coordinate
 * @property z - z坐标 / z coordinate
 */
const tablePositions: { x: number; z: number }[] = [
    // z=17的桌子位置，并排除在墙里或者和其他道具重复的
    ...[0, 1, 2, 5, 6, 7, 8, 10, 16, 17, 18].map((i) => ({
        x: 12 + i * 2,
        z: 17,
    })),

    // z=45的桌子，并排除在墙里的
    ...Array.from({ length: 19 })
        .map((_, i) => ({
            x: 12 + i * 2,
            z: 45,
        }))
        .filter((_, i) => i !== 9),

    // x=12的桌子位置
    ...Array.from({ length: 8 }).map((_, i) => ({
        x: 12,
        z: 27 + i * 2,
    })),

    // x=48的桌子位置，并排除出餐口占用的的
    ...Array.from({ length: 13 })
        .map((_, i) => ({ x: 48, z: 19 + i * 2 }))
        .filter((_, i) => i < 5 || i > 7), // 5~7是出窗口

    ...Array.from({ length: 5 }).flatMap((_, i) => [
        {
            x: 28,
            z: 19 + i * 2,
        },
        {
            x: 32,
            z: 19 + i * 2,
        },
    ]),

    ...Array.from({ length: 6 }).flatMap((_, i) => [
        {
            x: 28,
            z: 43 - i * 2,
        },
        {
            x: 32,
            z: 43 - i * 2,
        },
    ]),

    { x: 30, z: 27 },
    { x: 30, z: 33 },
];

/**
 * 无限食材配置组 / Food Box Config Group
 * @property x - x坐标 / x coordinate
 * @property z - z坐标 / z coordinate
 * @property mesh - 模型 / Model
 * @property foodType - 食材类型 / Food type
 */
const foodBoxConfigs: {
    x: number;
    z: number;
    mesh: GameModelAssets;
    foodType: FoodType;
}[] = [
    {
        x: 12,
        z: 19,
        mesh: 'mesh/食材箱 面包.vb',
        foodType: 'bread',
    },
    {
        x: 12,
        z: 21,
        mesh: 'mesh/食材箱 牛肉.vb',
        foodType: 'meat',
    },
    {
        x: 12,
        z: 23,
        mesh: 'mesh/食材箱 蔬菜.vb',
        foodType: 'vegetable',
    },
    {
        x: 12,
        z: 25,
        mesh: 'mesh/食材箱 番茄.vb',
        foodType: 'tomato',
    },
];

/**
 * 灶台位置 / Stove positions
 * @property x - x坐标 / x coordinate
 * @property z - z坐标 / z coordinate
 */
const stovePositions: { x: number; z: number }[] = Array.from({
    length: 5,
}).map((_, i) => ({
    x: 34 + i * 2,
    z: 17,
}));

/**
 * 天梯S2 定制可交互对象数据 / CodeLadderS2 Custom Interactable Data
 */
const codeLadderS2: IInteractableData[] = [
    ...tablePositions.map<IInteractableData>((position) => ({
        id: `table_${position.x}_${position.z}`,
        token: InteractableType.TableProp,
        entityConfig: {
            mesh: 'mesh/桌子1.vb',
            position: new GameVector3(position.x, 1.5, position.z),
            meshScale: new GameVector3(0.125, 0.125, 0.125),
        },
        interactRadius: 2,
    })),
    ...foodBoxConfigs.map<FoodBoxPropConfig>((config) => ({
        id: `foodBox_${config.x}_${config.z}`,
        token: InteractableType.FoodBoxProp,
        entityConfig: {
            mesh: config.mesh,
            position: new GameVector3(config.x, 1.5, config.z),
            meshScale: new GameVector3(0.08, 0.08, 0.08),
        },
        interactRadius: 2,
        foodType: config.foodType,
    })),
    ...stovePositions.map<IInteractableData>((position) => ({
        id: `stove_${position.x}_${position.z}`,
        token: InteractableType.StoveProp,
        entityConfig: {
            mesh: 'mesh/灶台.vb',
            position: new GameVector3(position.x, 1.5, position.z),
            meshScale: new GameVector3(0.125, 0.125, 0.125),
            meshOrientation: new GameQuaternion(0, 0, 0, 1).rotateY(
                Math.PI / 2
            ),
        },
        interactRadius: 2,
    })),
    {
        id: 'bin',
        token: InteractableType.BinProp,
        entityConfig: {
            mesh: 'mesh/垃圾桶.vb',
            position: new GameVector3(12, 1.8, 43),
            meshScale: new GameVector3(0.15, 0.15, 0.15),
        },
        interactRadius: 2,
    },
];

export default codeLadderS2;
