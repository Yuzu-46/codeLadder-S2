import type { IInteractableData } from '../../data/InteractableData';
import { InteractableType } from '../TokenConst';

const tablePositions: GameVector3[] = [];

/**
 * 天梯S2 定制可交互对象数据 / CodeLadderS2 Custom Interactable Data
 */
const codeLadderS2: IInteractableData[] = [
    ...tablePositions.map<IInteractableData>((position) => ({
        id: `table_${position.x}_${position.y}_${position.z}`,
        token: InteractableType.TableProp,
        entityConfig: {
            position,
            rotation: new GameVector3(0, 0, 0),
            scale: new GameVector3(1, 1, 1),
        },
        interactHint: '',
    })),
];
