import { EventEmitter } from '../../../../../framework/common/EventEmitter';
import { FactoryToken } from '../../../../../framework/common/factory/AbstractFactory';
import { PlayerEvent } from '../../../../const/EventConst';
import { InteractableType } from '../../../../const/TokenConst';
import type { IPlayerEventData } from '../../../../data/EventData';
import type { IInteractableData } from '../../../../data/InteractableData';
import { PropBindingMgr } from '../../../../mgr/PropBindingMgr';
import type { InGamePlayer } from '../../../player/GamePlayer';
import type { BaseFoodProp } from '../movableProp/base/BaseFoodProp';
import { TableProp } from './TableProp';

/**
 * 有切菜板的桌子道具 / Table Prop with chopping board
 */
@FactoryToken(InteractableType.TablePropWithChoppingBoard)
export class TablePropWithChoppingBoard extends TableProp {
    public start(config: IInteractableData): void {
        super.start(config);
        this.bindEvents();
    }

    /**
     * 绑定事件 / Bind events
     */
    private bindEvents(): void {
        EventEmitter.instance.on<IPlayerEventData<GameInputEvent>>(
            PlayerEvent.BtnPressAction0,
            this.onPlayerBtnPressAction0
        );
    }

    /**
     * 玩家按下按钮"action0"事件处理 / Player press button "action0" event handler
     */
    private onPlayerBtnPressAction0(
        payload: IPlayerEventData<GameInputEvent> | undefined
    ): void {
        if (this.entity && payload) {
            const { player } = payload;
            if (
                player.entity &&
                player.entity.position.distance(this.entity.position) <= 1
            ) {
                const foodId = PropBindingMgr.instance.getBindingDataByPropId(
                    this.id
                ).bindingData?.foodId;
                if (foodId) {
                    const food = this.getInteractable(foodId) as
                        | BaseFoodProp
                        | undefined;
                    if (food) {
                        // 如果玩家正在与桌子交互，并且桌子上有食物，那么触发切菜事件
                    }
                }
            }
        }
    }

    protected onInteractWithDynamicContainer(
        dynamicContainerId: string,
        event: GameInteractEvent
    ): void {
        // 有切菜板的桌子不会有动态容器，所以不可能触发此方法
    }

    protected onInteractWithoutBound(player: InGamePlayer): void {
        // 因为有切菜板的桌子不能放置动态容器类道具，所以只有当玩家没有携带任何容器时才允许与桌子进行交互
        if (!player.carryingProp.container) {
            super.onInteractWithoutBound(player);
        }
    }
}
