import type { FoodType } from '../const/FoodConst';
import type { SceneType } from '../config/SceneConfig';

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
    entityConfig?: Partial<GameEntityConfig>;
    /**
     * 实体
     * 如果实体存在，则不会使用实体配置再创建实体
     */
    entity?: GameEntity;
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

/**
 * 无限食材箱配置接口 / Infinite ingredients box configuration interface
 */
export interface FoodBoxPropConfig extends IInteractableData {
    /**
     * 食材类型
     */
    foodType: FoodType;
}
