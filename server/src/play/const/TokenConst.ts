/**
 * 玩家类型
 */
export const enum PlayerType {
    /**
     * 游戏玩家
     */
    GamePlayer = 'GamePlayer',
    /**
     * 等待匹配玩家
     */
    OBPlayer = 'OBPlayer',
}

/**
 * 可交互对象类型 / Interactable type
 */
export const enum InteractableType {
    /**
     * 传送NPC
     */
    PortalNpc = 'PortalNpc',
    /**
     * 桌子
     */
    TableProp = 'TableProp',
    /**
     * 灶台
     */
    StoveProp = 'StoveProp',
}
