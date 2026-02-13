import { BaseImmovableProp } from './BaseImmovableProp';
import { FactoryToken } from '@src/framework/common/factory/AbstractFactory';
import { InteractableType } from '../../../../const/TokenConst';
import type { IInteractableData } from '../../../../data/InteractableData';
import { PropBindingMgr } from '../../../../mgr/PropBindingMgr';
import type { InGamePlayer } from '../../../player/GamePlayer';

/**
 * 灶台道具 / Stove Prop
 */
@FactoryToken(InteractableType.StoveProp)
export class StoveProp extends BaseImmovableProp {
    public start(config: IInteractableData): void {
        super.start(config);
        console.log('(Server) StoveProp start with id ', config.id);

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
        // 触发此方法说明灶台没有锅却有食物，抛出错误
        throw new Error(
            `StoveProp ${this.id} interacted with food ${foodId} but has no pot bound!`
        );
    }

    protected onInteractWithoutBound(player: InGamePlayer): void {
        // TODO: 可以考虑添加一些提示玩家放置锅的逻辑
    }
}
