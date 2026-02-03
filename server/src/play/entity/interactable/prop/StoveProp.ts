import { Interactable } from '../base/Interactable';
import { FactoryToken } from '@src/framework/common/factory/AbstractFactory';
import { InteractableType } from '../../../const/TokenConst';
import type { IInteractableData } from '../../../data/InteractableData';

/**
 * 灶台道具 / Stove Prop
 */
@FactoryToken(InteractableType.StoveProp)
export class StoveProp extends Interactable {
    public start(config: IInteractableData): void {
        super.start(config);
        console.log('(Server) StoveProp start with id ', config.id);
    }
}
