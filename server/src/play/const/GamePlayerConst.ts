/**
 * 玩家游戏状态常量 / Player Game State Constants
 * 定义玩家在游戏中的不同状态，用于检测玩家是否挂机 / Defines different states of a player in the game, used to detect if the player is AFK
 */
export const enum PlayerGameState {
    /**
     * 正在游玩 / Playing state
     * 玩家正在积极进行游戏 / Player is actively playing the game
     */
    PLAYING = 'playing',

    /**
     * 疑似挂机 / Suspected AFK state
     * 玩家未操作，被标记为疑似挂机 / Player is inactive and marked as suspected AFK
     */
    SUSPECTED_AFK = 'suspected_afk',

    /**
     * 确认挂机 / Confirmed AFK state
     * 玩家已被确认处于挂机状态 / Player has been confirmed to be AFK
     */
    CONFIRMED_AFK = 'confirmed_afk',
}
