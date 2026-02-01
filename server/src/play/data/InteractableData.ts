/**
 * 可交互对象数据接口 / Interactable object data interface
 */
export interface IInteractableData {
    /**
     * 唯一标识
     */
    id: string;
    /**
     * 工厂标识
     */
    token: string;
    /**
     * 实体配置
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
 * 可交互对象配置接口 / Interactable object configuration interface
 */
export interface IInteractableConfig {
    /**
     * 可交互对象数据列表
     */
    data: IInteractableData[];
}
