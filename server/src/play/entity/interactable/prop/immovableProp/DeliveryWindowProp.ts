import { BaseImmovableProp } from './BaseImmovableProp';
import { FactoryToken } from '../../../../../framework/common/factory/AbstractFactory';
import { InteractableType } from '../../../../const/TokenConst';
import type { IDeliveryWindowPropConfig } from '../../../../data/InteractableData';
import { PlayerMgr } from '../../../../mgr/PlayerMgr';
import { InGamePlayer } from '../../../player/GamePlayer';
import { PropMgr } from '../../../../mgr/PropMgr';
import { ContainerState } from '../../../../const/ContainerConst';

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

    public onInteract(event: GameInteractEvent): void {
        console.log('(Server) DeliveryWindowProp interact with id ', this.id);
        const player = PlayerMgr.instance.getPlayer(event.entity.player.userId);
        if (player && player instanceof InGamePlayer) {
            if (
                this._returnPlatePosition &&
                player.carryingProp.container?.type === 'plate'
            ) {
                player.removeContainerProp();
                player.removeFoodProp();
                setTimeout(() => {
                    PropMgr.instance.placeProp(
                        {
                            container: {
                                type: 'plate',
                                state: ContainerState.CLEAN,
                            },
                            foods: [],
                        },
                        this._returnPlatePosition!
                    );
                }, 5000);
            }
        }
    }
}
