import type { ContainerState } from '../const/ContainerConst';
import type { FoodState } from '../const/FoodConst';
import type { IMovablePropData } from './MovablePropData';

/**
 * 携带的道具数据 / Carrying prop data
 */
export interface ICarryingPropData {
    /**
     * 道具数据 / Prop data
     */
    data: IMovablePropData<ContainerState>;

    /**
     * 子项 / Subitem
     */
    children?: IMovablePropData<FoodState>[];
}
