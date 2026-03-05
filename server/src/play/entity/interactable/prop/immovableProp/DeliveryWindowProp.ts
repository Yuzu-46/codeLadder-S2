import { BaseImmovableProp } from './BaseImmovableProp';
import { FactoryToken } from '../../../../../framework/common/factory/AbstractFactory';
import { InteractableType } from '../../../../const/TokenConst';
import type { IDeliveryWindowPropConfig } from '../../../../data/InteractableData';

/**
 * 送餐口道具 / Delivery window prop
 */
@FactoryToken(InteractableType.DeliveryWindowProp)
export class DeliveryWindowProp extends BaseImmovableProp {
    /**
     * 返回盘子位置 / Return plate position
     */
    private _returnPlatePosition: GameVector3 | null = null;

    public start(config: IDeliveryWindowPropConfig): void {
        super.start(config);
        this._returnPlatePosition = config.returnPlatePosition;
    }
}
