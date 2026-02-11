import type { IBasePlayer } from '../entity/player/BasePlayer';

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
    event?: T;
}
