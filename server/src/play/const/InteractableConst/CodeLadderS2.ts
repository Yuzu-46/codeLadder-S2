import type { IInteractableData } from '../../data/InteractableData';
import { InteractableType } from '../TokenConst';

/**
 * 桌子位置 / Table positions
 * @property x - x坐标 / x coordinate
 * @property z - z坐标 / z coordinate
 */
const tablePositions: { x: number; z: number }[] = [
    { x: 12, z: 17 },
    { x: 14, z: 17 },
    { x: 16, z: 17 },
];

/**
 * 灶台位置 / Stove positions
 * @property x - x坐标 / x coordinate
 * @property z - z坐标 / z coordinate
 */
const stovePositions: { x: number; z: number }[] = [
    { x: 35, z: 17 },
    { x: 37, z: 17 },
    { x: 39, z: 17 },
    { x: 41, z: 17 },
];

/**
 * 天梯S2 定制可交互对象数据 / CodeLadderS2 Custom Interactable Data
 */
const codeLadderS2: IInteractableData[] = [
    ...tablePositions.map<IInteractableData>((position) => ({
        id: `table_${position.x}_${position.z}`,
        token: InteractableType.TableProp,
        entityConfig: {
            mesh: 'mesh/医院桌子.vb',
            position: new GameVector3(position.x, 1.5, position.z),
            meshScale: new GameVector3(0.055, 0.1, 0.154),
        },
        interactRadius: 2,
    })),
    ...stovePositions.map<IInteractableData>((position) => ({
        id: `stove_${position.x}_${position.z}`,
        token: InteractableType.StoveProp,
        entityConfig: {
            mesh: 'mesh/巨人屋-灶台.vb',
            position: new GameVector3(position.x, 1.8, position.z),
            meshScale: new GameVector3(0.037, 0.037, 0.037),
            meshOrientation: new GameQuaternion(0, 0, 0, 1).rotateY(
                Math.PI / 2
            ),
        },
        interactRadius: 2,
    })),
];

export default codeLadderS2;
