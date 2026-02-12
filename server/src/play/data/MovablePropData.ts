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
export interface IMovablePropData<
    S extends ContainerState | IngredientState | '' =
        | ContainerState
        | IngredientState
        | '',
> {
    /**
     * 状态配置 / State configuration
     */
    states: Partial<
        Record<S, { mesh: GameModelAssets; interactHint?: string }>
    >;
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
 * 可移动道具配置接口 / Movable prop config interface
 */
export interface IMovablePropConfig {
    /**
     * 可移动道具数据列表 / Movable prop data list
     */
    data: {
        [K in ContainerType | IngredientType | FoodType]: IMovablePropData<
            K extends ContainerType
                ? ContainerState
                : K extends IngredientType
                  ? IngredientState
                  : ''
        >;
    };
}
