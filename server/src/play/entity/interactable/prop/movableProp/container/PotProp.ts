import { FactoryToken } from '@src/framework/common/factory/AbstractFactory';
import { InteractableType } from '../../../../../const/TokenConst';
import type { IContainerPropConfig } from '../../../../../data/InteractableData';
import { BaseContainerProp } from '../base/BaseContainerProp';
import type { ContainerType } from '../../../../../const/ContainerConst';
import { PanPotInteractableMixin } from './mixins/PanPotInteractableMixin';
import { ConfigMgr } from '../../../../../mgr/ConfigMgr';

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
     * @param tick
     */
    public cook(tick: number): void {
        if (
            tick % 5 === 0 &&
            this._fsm &&
            ConfigMgr.instance.getContainerConfig(this._type, this._fsm?.State)
                ?.canCook
        ) {
            // 每五帧执行一次
            this.food?.onCook();
        }
    }
}
