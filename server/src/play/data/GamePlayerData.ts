import type { ContainerState } from '../const/ContainerConst';
import type { FoodState } from '../const/FoodConst';

/**
 * 携带的道具数据 / Carrying prop data
 * @param T 状态类型 / State type
 */
export interface ICarryingProp<T> {
    /**
     * 道具ID / Prop ID
     */
    id: string;
    /**
     * 道具状态 / Prop state
     */
    state: T;
}

/**
 * 玩家携带的道具数据 / Player carrying prop data
 */
export interface IPlayerCarryingPropData {
    /**
     * 道具数据 / Prop data
     */
    data: ICarryingProp<ContainerState>;

    /**
     * 子项 / Subitem
     */
    children?: ICarryingProp<FoodState>[];
}
