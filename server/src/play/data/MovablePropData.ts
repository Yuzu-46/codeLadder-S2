import type { ContainerState, ContainerType } from '../const/ContainerConst';
import type { FoodState, FoodType } from '../const/FoodConst';

/**
 * 可移动道具数据 / Movable prop data
 */
export interface IMovablePropData<T, S> {
    /**
     * 道具类型 / Prop type
     */
    type: T;

    /**
     * 初始状态 / Initial state
     */
    initialState: S;

    /**
     * 模型 / Model
     */
    mesh: GameModelAssets;

    /**
     * 实体配置 / Entity config
     */
    entityConfig: Partial<GameEntityConfig>;

    /**
     * 穿戴配置 / Wearable config
     */
    wearableConfig?: Partial<GameWearable>;
}

/**
 * 容器道具数据 / Container prop data
 */
export type IContainerPropData = IMovablePropData<
    ContainerType,
    ContainerState
>;

/**
 * 食物/食材道具数据 / Food/Food prop data
 */
export interface IFoodPropData extends IMovablePropData<FoodType, FoodState> {
    /**
     * 配方 / Recipe
     */
    recipe: FoodType[];
}
