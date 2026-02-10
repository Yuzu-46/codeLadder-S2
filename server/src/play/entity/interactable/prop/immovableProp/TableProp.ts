import { BaseImmovableProp } from './BaseImmovableProp';
import { FactoryToken } from '@src/framework/common/factory/AbstractFactory';
import { InteractableType } from '@src/play/const/TokenConst';
import type { IInteractableData } from '../../../../data/InteractableData';
import { PlayerMgr } from '../../../../mgr/PlayerMgr';
import type { InGamePlayer } from '../../../player/GamePlayer';
import { PropBindingMgr } from '../../../../mgr/PropBindingMgr';

/**
 * 桌子道具 / Table Prop
 */
@FactoryToken(InteractableType.TableProp)
export class TableProp extends BaseImmovableProp {
    public start(config: IInteractableData): void {
        super.start(config);
        console.log('(Server) TableProp start with id ', config.id);

        // 添加绑定关系
        PropBindingMgr.instance.addBinding({
            staticContainerId: this.id,
        });
    }

    protected onInteractWithDynamicContainer(
        dynamicContainerId: string,
        event: GameInteractEvent
    ): void {
        this.getInteractable(dynamicContainerId)?.onInteract(event);
    }

    protected onInteractWithFood(
        foodId: string,
        event: GameInteractEvent
    ): void {
        this.getInteractable(foodId)?.onInteract(event);
    }

    protected onInteractWithoutBound(player: InGamePlayer): void {
        if (this.entity) {
            player.placeProp(this.entity.position, this);
        }
    }
}
