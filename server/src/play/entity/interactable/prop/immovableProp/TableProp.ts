import { BaseImmovableProp } from './BaseImmovableProp';
import { FactoryToken } from '@src/framework/common/factory/AbstractFactory';
import { InteractableType } from '@src/play/const/TokenConst';
import type { IInteractableData } from '../../../../data/InteractableData';
import { PlayerMgr } from '../../../../mgr/PlayerMgr';
import { InGamePlayer } from '../../../player/GamePlayer';

/**
 * 桌子道具 / Table Prop
 */
@FactoryToken(InteractableType.TableProp)
export class TableProp extends BaseImmovableProp {
    public start(config: IInteractableData): void {
        super.start(config);
        console.log('(Server) TableProp start with id ', config.id);
    }

    public onInteract(event: GameInteractEvent): void {
        super.onInteract(event);

        if (this._placedPropId) {
            // 如果桌子上有道具，则调用道具的交互事件
            const { placedProp } = this;
            if (placedProp) {
                placedProp.onInteract(event);
            }
        } else {
            // 否则，调用玩家放置道具的事件
            const player = PlayerMgr.instance.getPlayer(
                event.entity.player.userId
            );
            if (player && player instanceof InGamePlayer) {
                player.placeProp(this.entity!.position, this);
            }
        }
    }
}
