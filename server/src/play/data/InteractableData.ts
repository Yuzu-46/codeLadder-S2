import type { SceneType } from '../const/SceneConst';

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
     * 交互颜色
     * @default white
     */
    interactColor?: GameRGBColor;
    /**
     * 交互提示文本
     * @default '''
     */
    interactHint?: string;
    /**
     * 交互半径
     * @default 3
     */
    interactRadius?: number;
    /**
     * 交互时的声音配置
     * @default undefined
     */
    interactSound?: GameSoundEffectConfig | undefined;
}

/**
 * 可交互对象配置接口 / Interactable object configuration interface
 */
export interface IInteractableConfig {
    /**
     * 可交互对象数据列表
     */
    data: Record<SceneType, IInteractableData[]>;
}
