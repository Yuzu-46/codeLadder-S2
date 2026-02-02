import type { IInteractableConfig } from '../../data/InteractableData';
import main from './Main';
import codeLadderS2 from './CodeLadderS2';

/**
 * 可交互对象配置 / Interactable object configuration
 */
export const InteractableConfig: IInteractableConfig = {
    data: {
        main,
        codeLadderS2,
        hamburgerRestaurant: [],
    },
};
