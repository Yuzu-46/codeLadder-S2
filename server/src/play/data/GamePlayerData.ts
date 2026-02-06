import type { ContainerState, ContainerType } from '../const/ContainerConst';
import type { IngredientState, IngredientType } from '../const/FoodConst';

/**
 * 携带的道具数据 / Carrying prop data
 * @param T 状态类型 / State type
 */
export interface ICarryingProp<T, S> {
    /**
     * 道具类型 / Prop type
     */
    type: T;
    /**
     * 道具状态 / Prop state
     */
    state: S;
}

/**
 * 玩家携带的道具数据 / Player carrying prop data
 */
export interface IPlayerCarryingPropData {
    /**
     * 容器数据 / Container data
     */
    container: ICarryingProp<ContainerType, ContainerState> | null;

    /**
     * 食材数据 / Food data
     */
    foods: ICarryingProp<IngredientType, IngredientState>[];
}
