import { Interactable } from '../../../base/Interactable';
import type { IInteractableData } from '../../../../../data/InteractableData';

/**
 * 可移动道具基类 / Movable prop base class
 */
export abstract class BaseMovableProp extends Interactable {
    public start(config: IInteractableData): void {
        super.start(config);
    }
}
