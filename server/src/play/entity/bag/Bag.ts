import type { IBagItem, IPlayerBagData } from '../../data/PlayerData';

/**
 * 背包实体类 / Bag entity class
 */
export class Bag {
    private _items: Map<number, IBagItem> = new Map();
    private _maxSlots: number = 100; // 默认最大格子数 / Default max slots
    private _data: IPlayerBagData;

    constructor(data: IPlayerBagData) {
        this._data = data;
        this.initItems();
    }

    /**
     * 初始化物品 / Initialize items
     */
    private initItems(): void {
        if (this._data.items) {
            this._data.items.forEach((item) => {
                this._items.set(item.id, { ...item });
            });
        }
    }

    /**
     * 添加物品 / Add item
     * @param itemId 物品ID / Item ID
     * @param count 数量 / Count
     * @returns 是否添加成功 / Whether the addition was successful
     */
    public addItem(itemId: number, count: number): boolean {
        if (this._items.size >= this._maxSlots && !this._items.has(itemId)) {
            return false; // 背包已满且没有该物品 / Bag is full and item doesn't exist
        }

        const existingItem = this._items.get(itemId);
        if (existingItem) {
            existingItem.count += count;
        } else {
            this._items.set(itemId, {
                id: itemId,
                count: count,
                type: 0, // 默认类型为0，实际使用时应该根据物品配置获取 / Default type is 0, should get from item config in real usage
            });
        }
        return true;
    }

    /**
     * 移除物品 / Remove item
     * @param itemId 物品ID / Item ID
     * @param count 数量 / Count
     * @returns 是否移除成功 / Whether the removal was successful
     */
    public removeItem(itemId: number, count: number): boolean {
        const item = this._items.get(itemId);
        if (!item || item.count < count) {
            return false;
        }

        item.count -= count;
        if (item.count <= 0) {
            this._items.delete(itemId);
        }
        return true;
    }

    /**
     * 获取物品数量 / Get item count
     * @param itemId 物品ID / Item ID
     * @returns 物品数量 / Item count
     */
    public getItemCount(itemId: number): number {
        return this._items.get(itemId)?.count || 0;
    }

    /**
     * 获取所有物品 / Get all items
     * @returns 所有物品数组 / Array of all items
     */
    public getAllItems(): IBagItem[] {
        return Array.from(this._items.values());
    }

    /**
     * 检查是否有足够数量的物品 / Check if has enough items
     * @param itemId 物品ID / Item ID
     * @param count 数量 / Count
     * @returns 是否足够 / Whether has enough
     */
    public hasEnoughItem(itemId: number, count: number): boolean {
        return this.getItemCount(itemId) >= count;
    }

    /**
     * 获取背包数据 / Get bag data
     * @returns 背包数据 / Bag data
     */
    public getBagData(): IPlayerBagData {
        return {
            items: this.getAllItems(),
        };
    }
}
