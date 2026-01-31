/**
 * 玩家数据 / Player data
 */
export interface IPlayerData {
    /**
     * 上次登录时间 / Last login time
     */
    lastLoginTime: number;
    /**
     * 上次登出时间 / Last logout time
     */
    lastLogoutTime: number;
}

/**
 * 玩家背包数据 / Player bag data
 */
export interface IPlayerBagData {
    /**
     * 背包物品 / Bag items
     */
    items: Array<IBagItem>;
}

/**
 * 背包物品 / Bag item
 */
export interface IBagItem {
    /**
     * 物品ID / Item ID
     */
    id: number;
    /**
     * 物品数量 / Item quantity
     */
    count: number;
    /**
     * 物品类型 / Item type
     */
    type: number;
}
