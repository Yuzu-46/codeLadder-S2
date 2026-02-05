import { BaseMovableProp } from '../base/BaseMovableProp';
import { FactoryToken } from '@src/framework/common/factory/AbstractFactory';
import { InteractableType } from '../../../../../const/TokenConst';
import { ContainerState } from '../../../../../const/ContainerConst';
import type { IInteractableData } from '../../../../../data/InteractableData';
import { PlayerMgr } from '../../../../../mgr/PlayerMgr';
import type { InGamePlayer } from '../../../../player/GamePlayer';

/**
 * 盘子道具 / Plate prop
 */
@FactoryToken(InteractableType.PlateProp)
export class PlateProp extends BaseMovableProp {
    /**
     * 子项
     */
    public children: BaseMovableProp | null = null;

    public start(config: IInteractableData): void {
        super.start(config);
        console.log('(Server) PlateProp start with id ', config.id);
        this._type = 'plate';
    }

    public async onInteract(event: GameInteractEvent): Promise<void> {
        super.onInteract(event);
        const { entity } = event;
        const player = PlayerMgr.instance.getPlayer(
            entity.player.userId
        ) as InGamePlayer;
        if (player.carryingProp) {
            // 如果玩家拿着某道具
            // more...
        } else {
            // 玩家没有拿着道具
            player.carryingProp = {
                data: {
                    type: 'plate',
                    state: ContainerState.CLEAN,
                },
            };
            this.children?.wear(player);
            this.wear(player);
        }
    }
}
