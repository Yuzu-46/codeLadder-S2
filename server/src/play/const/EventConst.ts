/**
 * 玩家事件类型 / Player event type
 */
export const enum PlayerEvent {
    /**
     * 玩家按下按钮"action0"事件 / Player presses "action0" button event
     */
    BtnPressAction0 = 'BtnPressAction0',
}

/**
 * 道具事件类型 / Prop event type
 */
export const enum PropEvent {
    /**
     * 道具绑定更新事件 / Prop binding update event
     */
    BindingUpdate = 'BindingUpdate',
    /**
     * 道具绑定删除事件 / Prop binding delete event
     */
    BindingDelete = 'BindingDelete',
}
