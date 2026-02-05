import { BaseMovableProp } from '../base/BaseMovableProp';
import { FactoryToken } from '@src/framework/common/factory/AbstractFactory';
import { InteractableType } from '../../../../../const/TokenConst';
import { ContainerState } from '../../../../../const/ContainerConst';
import type { IInteractableData } from '../../../../../data/InteractableData';

/**
 * 盘子道具 / Plate prop
 */
@FactoryToken(InteractableType.PlateProp)
export class PlateProp extends BaseMovableProp {
    public start(config: IInteractableData): void {
        super.start(config);
        console.log('(Server) PlateProp start with id ', config.id);
    }
}
