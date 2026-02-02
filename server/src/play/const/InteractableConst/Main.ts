import type { IInteractableData } from '../../data/InteractableData';
import { InteractableType } from '../TokenConst';

/**
 * 主场景可交互对象数据 / Main scene interactable data
 */
const main: IInteractableData[] = [
    {
        id: InteractableType.PortalNpc,
        token: InteractableType.PortalNpc,
        entityConfig: {
            mesh: 'mesh/npc_7.vb',
            position: new GameVector3(20, 2.5, 20),
            meshScale: new GameVector3(0.0625, 0.0625, 0.0625),
        },
        interactHint: '传送',
        interactRadius: 3,
    },
];

export default main;
