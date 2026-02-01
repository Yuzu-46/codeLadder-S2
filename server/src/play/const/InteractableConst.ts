import type { IInteractableConfig } from '../data/InteractableData';
import { InteractableType } from './TokenConst';

/**
 * 可交互对象配置 / Interactable object configuration
 */
export const InteractableConfig: IInteractableConfig = {
    data: {
        main: [
            {
                id: InteractableType.PortalNpc,
                token: InteractableType.PortalNpc,
                entityConfig: {
                    id: InteractableType.PortalNpc,
                    mesh: 'mesh/npc_7.vb',
                    position: new GameVector3(20, 2.5, 20),
                    meshScale: new GameVector3(0.0625, 0.0625, 0.0625),
                },
                interactHint: '传送',
                interactRadius: 3,
            },
        ],
        hamburgerRestaurant: [],
    },
};
