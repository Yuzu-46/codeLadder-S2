import { FactoryToken } from '@src/framework/common/factory/AbstractFactory';
import { InteractableType } from '../../../../../const/TokenConst';
import type { IContainerPropConfig } from '../../../../../data/InteractableData';
import { BaseContainerProp } from '../base/BaseContainerProp';
import type { ContainerType } from '../../../../../const/ContainerConst';
import { PanPotInteractableMixin } from './mixins/PanPotInteractableMixin';

/**
 * 煮锅道具 / Pot prop
 */
@FactoryToken(InteractableType.PotProp)
export class PotProp extends PanPotInteractableMixin(BaseContainerProp) {
    protected _type = 'pot' as ContainerType;

    public start(config: IContainerPropConfig): void {
        super.start(config);
        console.log('(Server) PotProp start with id ', config.id);
    }

    /**
     * 烹饪 / Cook
     */
    public cook(): void {
        this.food?.onCook();
    }
}
