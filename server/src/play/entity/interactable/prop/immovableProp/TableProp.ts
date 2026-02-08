import { BaseImmovableProp } from './BaseImmovableProp';
import { FactoryToken } from '@src/framework/common/factory/AbstractFactory';
import { InteractableType } from '@src/play/const/TokenConst';
import type { IInteractableData } from '../../../../data/InteractableData';
import { PlayerMgr } from '../../../../mgr/PlayerMgr';
import type { InGamePlayer } from '../../../player/GamePlayer';
import { PropBindingManager } from '../../../../mgr/PropBindingMgr';

/**
 * 桌子道具 / Table Prop
 */
@FactoryToken(InteractableType.TableProp)
export class TableProp extends BaseImmovableProp {
    public start(config: IInteractableData): void {
        super.start(config);
        console.log('(Server) TableProp start with id ', config.id);

        PropBindingManager.instance.addBinding({
            staticContainerId: this.id,
        });
    }

    public onInteract(event: GameInteractEvent): void {
        super.onInteract(event);

        const { bindingId, bindingData } =
            PropBindingManager.instance.getBindingDataByPropId(this.id);
        const player = PlayerMgr.instance.getPlayer(
            event.entity.player.userId
        ) as InGamePlayer;
        if (bindingData && player) {
            if (bindingData.dynamicContainerId) {
                this.getInteractable(
                    bindingData.dynamicContainerId
                )?.onInteract(event);
            } else if (bindingData.foodId) {
                this.getInteractable(bindingData.foodId)?.onInteract(event);
            } else {
                if (this.entity) {
                    player.placeProp(this.entity.position, this);
                }
            }
        }
    }
}
