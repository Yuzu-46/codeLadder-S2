import type { ContainerState, ContainerType } from '../const/ContainerConst';
import type {
    IngredientState,
    FoodType,
    IngredientType,
} from '../const/FoodConst';
import type { IInteractableData } from './InteractableData';

/**
 * 可移动道具数据 / Movable prop data
 */
export interface IMovablePropData<S> {
    /**
     * 初始状态 / Initial state
     */
    initialState: S;

    /**
     * 模型 / Model
     */
    mesh: GameModelAssets;

    /**
     * 可交互实体配置 / Interactable entity config
     */
    interactableConfig: IInteractableData;

    /**
     * 穿戴配置 / Wearable config
     */
    wearableConfig?: Partial<GameWearable>;
}

/**
 * 容器道具数据 / Container prop data
 */
export type IContainerPropData = IMovablePropData<ContainerState>;

/**
 * 食物/食材道具数据 / Food/Food prop data
 */
export type IFoodPropData = IMovablePropData<IngredientState>;

/**
 * 可移动道具配置接口 / Movable prop config interface
 */
export interface IMovablePropConfig {
    /**
     * 可移动道具数据列表 / Movable prop data list
     */
    data: {
        [K in
            | ContainerType
            | IngredientType
            | FoodType]: K extends ContainerType
            ? IMovablePropData<ContainerState>
            : K extends IngredientType
              ? IMovablePropData<IngredientState>
              : K extends FoodType
                ? IMovablePropData<never>
                : never;
    };
}
