import { FactoryToken } from '@src/framework/common/factory/AbstractFactory';
import { InteractableType } from '../../../../../const/TokenConst';
import type { IContainerPropConfig } from '../../../../../data/InteractableData';
import { BaseContainerProp } from '../base/BaseContainerProp';
import type { ContainerType } from '../../../../../const/ContainerConst';

/**
 * 盘子道具 / Plate prop
 */
@FactoryToken(InteractableType.PlateProp)
export class PlateProp extends BaseContainerProp {
    protected _type = 'plate' as ContainerType;

    public start(config: IContainerPropConfig): void {
        super.start(config);
        console.log('(Server) PlateProp start with id ', config.id);
    }

    public onInteract(event: GameInteractEvent): void {
        super.onInteract(event);
    }

    public destroy(): void {
        super.destroy();
    }
}
