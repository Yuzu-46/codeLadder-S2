/**
 * 存储常量 / Storage constants
 */
export const StorageConst = {
    PLAYER_DATA: 'player_data', //玩家数据 / Player data
    PLAYER_BAG_DATA: 'player_bag_data', //玩家背包数据 / Player bag data
} as const;

/**
 * 存储键类型 / Storage key type
 */
export type StorageKey = (typeof StorageConst)[keyof typeof StorageConst];
