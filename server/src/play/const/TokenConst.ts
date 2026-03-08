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
     * 带切菜板的桌子
     */
    TablePropWithChoppingBoard = 'TablePropWithChoppingBoard',
    /**
     * 灶台
     */
    StoveProp = 'StoveProp',
    /**
     * 无限食材箱
     */
    FoodBoxProp = 'FoodBoxProp',
    /**
     * 垃圾箱
     */
    BinProp = 'BinProp',
    /**
     * 洗碗池
     */
    SinkProp = 'SinkProp',
    /**
     * 送餐口
     */
    DeliveryWindowProp = 'DeliveryWindowProp',
    /**
     * 盘子
     */
    PlateProp = 'PlateProp',
    /**
     * 煎锅
     */
    PanProp = 'PanProp',
    /**
     * 煮锅
     */
    PotProp = 'PotProp',
    /**
     * 食物/食材（普通）
     */
    FoodProp = 'FoodProp',
}
