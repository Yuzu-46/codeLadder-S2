import type { IInteractableData } from '../../data/InteractableData';
import { InteractableType } from '../TokenConst';

/**
 * 桌子位置 / Table positions
 * @property x - x坐标 / x coordinate
 * @property z - z坐标 / z coordinate
 */
const tablePositions: { x: number; z: number }[] = [{ x: 11, z: 16 }];

/**
 * 天梯S2 定制可交互对象数据 / CodeLadderS2 Custom Interactable Data
 */
const codeLadderS2: IInteractableData[] = [
    ...tablePositions.map<IInteractableData>((position) => ({
        id: `table_${position.x}_${position.z}`,
        token: InteractableType.TableProp,
        entityConfig: {
            mesh: 'mesh/医院桌子.vb',
            position: new GameVector3(position.x, 1, position.z),
            rotation: new GameVector3(0, 0, 0),
            scale: new GameVector3(1, 1, 1),
        },
        interactHint: '',
    })),
];

export default codeLadderS2;
