import { Interactable } from '../base/Interactable';
import { FactoryToken } from '@src/framework/common/factory/AbstractFactory';
import { InteractableType } from '../../../const/TokenConst';
import type { IInteractableData } from '../../../data/InteractableData';

/**
 * 无限食材箱 / Food Box Prop
 */
@FactoryToken(InteractableType.FoodBoxProp)
export class FoodBoxProp extends Interactable {
    public start(config: IInteractableData): void {
        super.start(config);
        console.log('(Server) FoodBoxProp start with id ', config.id);
    }
}
