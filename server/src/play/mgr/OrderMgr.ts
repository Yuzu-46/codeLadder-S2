import { Singleton } from '../../framework/common/Singleton';
import type { Observer } from '../../framework/common/Observer';
import type { OrderData } from '../data/OrderData';

/**
 * 订单管理器 / Order manager
 */
export class OrderMgr extends Singleton<OrderMgr>() {
    /**
     * 订单数据 / Order data
     */
    private _orderData: Observer<OrderData>[] = [];
}
