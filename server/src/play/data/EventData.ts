import type { IBasePlayer } from '../entity/player/BasePlayer';
import type { IPropBindingData } from './PropBindingData';

/**
 * 玩家事件数据 / Player event data
 */
export interface IPlayerEventData<T = unknown> {
    /**
     * 玩家 / Player
     */
    player: IBasePlayer;
    /**
     * 事件数据 / Event data
     */
    data?: T;
}

/**
 * 道具绑定事件数据 / Prop binding event data
 */
export interface IPropBindingEventData {
    /**
     * 绑定数据 / Binding data
     */
    data: IPropBindingData;
}
