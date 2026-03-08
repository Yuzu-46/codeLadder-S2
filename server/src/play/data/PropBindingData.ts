/**
 * 道具绑定数据 / Prop binding data
 */
export interface IPropBindingData {
    /**
     * 静态容器ID / Static container ID
     * @example 'table_1_1' （桌子）
     */
    staticContainerId: string | null;
    /**
     * 动态容器ID / Dynamic container ID
     * @example 'plate_1_1' （盘子）
     */
    dynamicContainerId: string | null;
    /**
     * 食材ID / Food ID
     * @example 'apple_1_1' （苹果）
     */
    foodId: string | null;
}
