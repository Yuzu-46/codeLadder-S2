import { FactoryToken } from '@src/framework/common/factory/AbstractFactory';
import { InteractableType } from '../../../../../const/TokenConst';
import type { IInteractableData } from '../../../../../data/InteractableData';
import { BaseContainerProp } from '../base/BaseContainerProp';

/**
 * 盘子道具 / Plate prop
 */
@FactoryToken(InteractableType.PlateProp)
export class PlateProp extends BaseContainerProp {
    public start(config: IInteractableData): void {
        super.start(config);
        console.log('(Server) PlateProp start with id ', config.id);
        this._type = 'plate';
    }

    public onInteract(event: GameInteractEvent): void {
        super.onInteract(event);
    }

    public destroy(): void {
        super.destroy();
    }
}
