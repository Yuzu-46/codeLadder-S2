/**
 * 可移动道具数据 / Movable prop data
 * @param T 可移动道具状态 / Movable prop state
 */
export interface IMovablePropData<T> {
    /**
     * 道具ID / Prop ID
     */
    id: string;
    /**
     * 道具状态 / Prop state
     */
    state: T;
}
