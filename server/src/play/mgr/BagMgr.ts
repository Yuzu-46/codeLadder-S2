import { Singleton } from '../../framework/common/Singleton';
import type { IPlayerBagData } from '../data/PlayerData';
import { Bag } from '../entity/bag/Bag';

/**
 * 背包管理器 / Bag Manager
 */
export class BagMgr extends Singleton<BagMgr>() {
    /**
     * 玩家背包映射 / Player bag map
     */
    private _playerBags: Map<string, Bag> = new Map();

    /**
     * 初始化玩家背包 / Initialize player bag
     * @param userId 用户ID / User ID
     * @param bagData 背包数据 / Bag data
     */
    public initPlayerBag(userId: string, bagData: IPlayerBagData): void {
        if (this._playerBags.has(userId)) {
            console.warn(`[BagMgr] Player ${userId} bag already initialized`);
            return;
        }

        const bag = new Bag(bagData);
        this._playerBags.set(userId, bag);
        console.log(`[BagMgr] Initialized bag for player ${userId}`);
    }

    /**
     * 获取玩家背包 / Get player bag
     * @param userId 用户ID / User ID
     * @returns 背包实例 / Bag instance
     */
    public getPlayerBag(userId: string): Bag | null {
        return this._playerBags.get(userId) || null;
    }

    /**
     * 添加物品到玩家背包 / Add item to player bag
     * @param userId 用户ID / User ID
     * @param itemId 物品ID / Item ID
     * @param count 数量 / Count
     * @returns 是否添加成功 / Whether the addition was successful
     */
    public addItem(userId: string, itemId: number, count: number): boolean {
        const bag = this.getPlayerBag(userId);
        if (!bag) {
            console.error(`[BagMgr] Player ${userId} bag not found`);
            return false;
        }
        return bag.addItem(itemId, count);
    }

    /**
     * 从玩家背包移除物品 / Remove item from player bag
     * @param userId 用户ID / User ID
     * @param itemId 物品ID / Item ID
     * @param count 数量 / Count
     * @returns 是否移除成功 / Whether the removal was successful
     */
    public removeItem(userId: string, itemId: number, count: number): boolean {
        const bag = this.getPlayerBag(userId);
        if (!bag) {
            console.error(`[BagMgr] Player ${userId} bag not found`);
            return false;
        }
        return bag.removeItem(itemId, count);
    }

    /**
     * 获取玩家物品数量 / Get player item count
     * @param userId 用户ID / User ID
     * @param itemId 物品ID / Item ID
     * @returns 物品数量 / Item count
     */
    public getItemCount(userId: string, itemId: number): number {
        const bag = this.getPlayerBag(userId);
        if (!bag) {
            console.error(`[BagMgr] Player ${userId} bag not found`);
            return 0;
        }
        return bag.getItemCount(itemId);
    }

    /**
     * 获取玩家背包数据 / Get player bag data
     * @param userId 用户ID / User ID
     * @returns 背包数据 / Bag data
     */
    public getBagData(userId: string): IPlayerBagData | null {
        const bag = this.getPlayerBag(userId);
        if (!bag) {
            console.error(`[BagMgr] Player ${userId} bag not found`);
            return null;
        }
        return bag.getBagData();
    }

    /**
     * 检查玩家是否有足够数量的物品 / Check if player has enough items
     * @param userId 用户ID / User ID
     * @param itemId 物品ID / Item ID
     * @param count 数量 / Count
     * @returns 是否足够 / Whether has enough
     */
    public hasEnoughItem(
        userId: string,
        itemId: number,
        count: number
    ): boolean {
        const bag = this.getPlayerBag(userId);
        if (!bag) {
            console.error(`[BagMgr] Player ${userId} bag not found`);
            return false;
        }
        return bag.hasEnoughItem(itemId, count);
    }

    /**
     * 移除玩家背包 / Remove player bag
     * @param userId 用户ID / User ID
     */
    public removePlayerBag(userId: string): void {
        this._playerBags.delete(userId);
        console.log(`[BagMgr] Removed bag for player ${userId}`);
    }
}
