import type { FoodType } from '../const/FoodConst';

/**
 * 订单数据 / Order data
 */
export interface OrderData {
    /**
     * 订单ID / Order ID
     */
    id: string;
    /**
     * 订单内容 / Order content
     */
    content: FoodType;
    /**
     * 开始时间 / Start time
     */
    startTime: number;
    /**
     * 限时 / Time limit
     */
    timeLimit: number;
}
