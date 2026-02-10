import { BaseImmovableProp } from './BaseImmovableProp';
import { FactoryToken } from '@src/framework/common/factory/AbstractFactory';
import { InteractableType } from '../../../../const/TokenConst';
import type { IInteractableData } from '../../../../data/InteractableData';
import { PlayerMgr } from '../../../../mgr/PlayerMgr';
import type { InGamePlayer } from '../../../player/GamePlayer';

/**
 * 垃圾箱道具 / Garbage Bin Prop
 */
@FactoryToken(InteractableType.BinProp)
export class BinProp extends BaseImmovableProp {
    public start(config: IInteractableData): void {
        super.start(config);
        console.log('(Server) BinProp start with id ', config.id);
    }

    public onInteract(event: GameInteractEvent): void {
        console.log('(Server) BinProp onInteract with id ', this.id);

        const player = PlayerMgr.instance.getPlayer(
            event.entity.player.userId
        ) as InGamePlayer | undefined;
        if (player) {
            player.dropFoodProp();
        }
    }
}
