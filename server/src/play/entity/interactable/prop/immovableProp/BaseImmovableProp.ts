import { Interactable } from '../../base/Interactable';
import type { InGamePlayer } from '../../../player/GamePlayer';
import { PropBindingMgr } from '../../../../mgr/PropBindingMgr';
import { PlayerMgr } from '../../../../mgr/PlayerMgr';

/**
 * 静态不可移动道具基类 / Base class for static immovable props
 */
export abstract class BaseImmovableProp extends Interactable {
    public onInteract(event: GameInteractEvent): void {
        super.onInteract(event);

        let { bindingId, bindingData } =
            PropBindingMgr.instance.getBindingDataByPropId(this.id);
        if (!bindingId) {
            PropBindingMgr.instance.addBinding({
                staticContainerId: this.id,
            });
            ({ bindingId, bindingData } =
                PropBindingMgr.instance.getBindingDataByPropId(this.id));
        }

        const player = PlayerMgr.instance.getPlayer(
            event.entity.player.userId
        ) as InGamePlayer;

        if (bindingData && player) {
            // 如果有绑定的动态容器或食材，则触发动态容器或食材的交互事件（权重：动态容器 > 食材）
            // 否则，调用玩家放置道具的事件
            if (bindingData.dynamicContainerId) {
                this.onInteractWithDynamicContainer(
                    bindingData.dynamicContainerId,
                    event
                );
            } else if (bindingData.foodId) {
                this.onInteractWithFood(bindingData.foodId, event);
            } else {
                this.onInteractWithoutBound(player);
            }
        }
    }

    /**
     * 处理有绑定动态容器时的交互事件 / Process interaction event with bound dynamic container
     * @param dynamicContainerId 动态容器ID / Dynamic container ID
     * @param event 交互事件 / Interaction event
     */
    protected onInteractWithDynamicContainer(
        dynamicContainerId: string,
        event: GameInteractEvent
    ): void {}

    /**
     * 处理有绑定食材时的交互事件 / Process interaction event with bound food
     * @param foodId 食材ID / Food ID
     * @param event 交互事件 / Interaction event
     */
    protected onInteractWithFood(
        foodId: string,
        event: GameInteractEvent
    ): void {}

    /**
     * 处理都无绑定动态容器和食材时的交互事件 / Process interaction event without bound dynamic container and food
     * @param player 玩家 / Player
     */
    protected onInteractWithoutBound(player: InGamePlayer): void {}
}
