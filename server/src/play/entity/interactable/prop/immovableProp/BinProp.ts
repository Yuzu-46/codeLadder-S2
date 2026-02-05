import { BaseImmovableProp } from './BaseImmovableProp';
import { FactoryToken } from '@src/framework/common/factory/AbstractFactory';
import { InteractableType } from '../../../../const/TokenConst';
import type { IInteractableData } from '../../../../data/InteractableData';

/**
 * 垃圾箱道具 / Garbage Bin Prop
 */
@FactoryToken(InteractableType.BinProp)
export class BinProp extends BaseImmovableProp {
    public start(config: IInteractableData): void {
        super.start(config);
        console.log('(Server) BinProp start with id ', config.id);
    }
}
