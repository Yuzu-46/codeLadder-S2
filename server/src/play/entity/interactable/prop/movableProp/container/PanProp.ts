import { FactoryToken } from '@src/framework/common/factory/AbstractFactory';
import { InteractableType } from '../../../../../const/TokenConst';
import type { IContainerPropConfig } from '../../../../../data/InteractableData';
import { BaseContainerProp } from '../base/BaseContainerProp';
import type { ContainerType } from '../../../../../const/ContainerConst';
import { PanPotInteractableMixin } from './mixins/PanPotInteractableMixin';

/**
 * 煎锅道具 / Pan prop
 */
@FactoryToken(InteractableType.PanProp)
export class PanProp extends PanPotInteractableMixin(BaseContainerProp) {
    protected _type = 'pan' as ContainerType;

    public start(config: IContainerPropConfig): void {
        super.start(config);
        console.log('(Server) PanProp start with id ', config.id);
    }
}
