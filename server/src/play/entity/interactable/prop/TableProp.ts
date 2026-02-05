import { Interactable } from '../base/Interactable';
import { FactoryToken } from '@src/framework/common/factory/AbstractFactory';
import { InteractableType } from '@src/play/const/TokenConst';
import type { IInteractableData } from '../../../data/InteractableData';
import type { BaseMovableProp } from './movableProp/base/BaseMovableProp';
import { PlayerMgr } from '../../../mgr/PlayerMgr';
import { InGamePlayer } from '../../player/GamePlayer';

/**
 * 桌子道具 / Table Prop
 */
@FactoryToken(InteractableType.TableProp)
export class TableProp extends Interactable {
    /**
     * 桌子上的道具 / Table Props
     */
    public tableProps: BaseMovableProp | null = null;

    public start(config: IInteractableData): void {
        super.start(config);
        console.log('(Server) TableProp start with id ', config.id);
    }

    public async onInteract(event: GameInteractEvent): Promise<void> {
        super.onInteract(event);
        if (this.tableProps) {
            // 如果桌子上有道具，则调用道具的交互事件
            await this.tableProps.onInteract(event);
        } else {
            // 否则，调用玩家放置道具的事件
            const player = PlayerMgr.instance.getPlayer(
                event.entity.player.userId
            );
            if (player && player instanceof InGamePlayer) {
                player.placeProp(this.entity!.position);
            }
        }
    }
}
