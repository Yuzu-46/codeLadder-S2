/**
 * NPC数据 / NPC data
 */
export interface INpcData {
    /**
     * NPC的唯一标识
     */
    id: string;
    /**
     * 工厂标识
     */
    token: string;
    /**
     * NPC实体配置
     */
    entityConfig: Partial<GameEntityConfig>;
    /**
     * 交互提示文本
     */
    interactHint: string;
    /**
     * 交互距离
     * @default 3
     */
    interactRadius?: number;
}

/**
 * NPC配置接口 / NPC configuration interface
 */
export interface INpcConfig {
    /**
     * NPC数据列表
     */
    data: INpcData[];
}