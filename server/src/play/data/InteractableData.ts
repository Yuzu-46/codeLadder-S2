import type { IngredientState, IngredientType } from '../const/FoodConst';
import type { SceneType } from '../const/SceneConst';
import type { ContainerState } from '../const/ContainerConst';

/**
 * 可交互对象数据接口 / Interactable object data interface
 */
export interface IInteractableData {
    /**
     * 唯一标识
     */
    id: string | (() => string);
    /**
     * 工厂标识
     */
    token: string;
    /**
     * 实体配置
     */
    entityConfig?: Partial<GameEntityConfig>;
    /**
     * 通过实体配置创建实体时的位置偏移 / Entity configuration position offset
     */
    offset?: GameVector3;
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
     * @default 2
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
export interface IFoodBoxPropConfig extends IInteractableData {
    /**
     * 食材类型
     */
    foodType: IngredientType;
}

/**
 * 容器配置接口 / Container configuration interface
 */
export interface IContainerPropConfig extends IInteractableData {
    /**
     * 容器状态 / Container state
     */
    state: ContainerState;
    /**
     * 要绑定的静态容器ID / Static container ID to bind
     * @description 静态容器就是可以存放物品的不可移动道具，比如桌子
     */
    bindStaticContainerId?: string;
}

/**
 * 食材配置接口 / Ingredient configuration interface
 */
export interface IIngredientConfig extends IInteractableData {
    /**
     * 食材类型
     */
    type: IngredientType[];
    /**
     * 食材状态
     */
    state: IngredientState[];
}
