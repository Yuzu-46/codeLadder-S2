import { Observer } from '../../framework/common/Observer';
import { Singleton } from '../../framework/common/Singleton';
import { StorageConst } from '../const/StorageConst';
import type { IPlayerBagData, IPlayerData } from '../data/PlayerData';
import { PlayerMgr } from './PlayerMgr';
import { StorageMgr } from './StorageMgr';

/**
 * 玩家数据管理器 / Player data manager
 */
export class PlayerDataMgr extends Singleton<PlayerDataMgr>() {
    /**
     * 玩家数据 / Player data
     */
    private _playerData: Map<string, Observer<IPlayerData>> = new Map();

    /**
     * 玩家背包数据 / Player bag data
     */
    private _playerBagData: Map<string, Observer<IPlayerBagData>> = new Map();

    /**
     * 清除时间计数器 / Clear time count
     */
    private _clearTimeCount: number = 0;

    /**
     * 清除时间 / Clear time
     */
    private _clearTime: number = 60 * 30 * 1000;

    /**
     * 更新 / Update
     */
    public update(tick: number): void {
        this._clearTimeCount += tick;
        if (this._clearTimeCount >= this._clearTime) {
            this._clearTimeCount = 0;
            this.clearLogoutData();
        }
    }

    /**
     * 获取玩家数据 / Get player data
     */
    public getPlayerData(userId: string): Observer<IPlayerData> | null {
        if (!this._playerData.has(userId)) {
            return null;
        }
        return this._playerData.get(userId) || null;
    }

    /**
     * 获取玩家背包数据 / Get player bag data
     */
    public getPlayerBagData(userId: string): Observer<IPlayerBagData> | null {
        if (!this._playerBagData.has(userId)) {
            return null;
        }
        return this._playerBagData.get(userId) || null;
    }

    /**
     * 添加玩家数据 / Add player data
     */
    public addPlayerData(userId: string, data: IPlayerData) {
        if (this._playerData.has(userId)) {
            return;
        }
        this._playerData.set(userId, new Observer<IPlayerData>(data));
    }

    /**
     * 添加玩家背包数据 / Add player bag data
     */
    public addPlayerBagData(userId: string, data: IPlayerBagData) {
        if (this._playerBagData.has(userId)) {
            return;
        }
        this._playerBagData.set(userId, new Observer<IPlayerBagData>(data));
    }

    /**
     * 移除玩家数据 / Remove player data
     */
    public removePlayerData(userId: string) {
        if (!this._playerData.has(userId)) {
            return;
        }
        this._playerData.get(userId)?.removeAllListeners();
        this._playerData.delete(userId);
    }

    /**
     * 移除玩家背包数据 / Remove player bag data
     */
    public removePlayerBagData(userId: string) {
        if (!this._playerBagData.has(userId)) {
            return;
        }
        this._playerBagData.get(userId)?.removeAllListeners();
        this._playerBagData.delete(userId);
    }

    /**
     * 更新玩家数据 / Update player data
     */
    public updatePlayerData(userId: string, data: IPlayerData) {
        this._playerData.get(userId)?.setSubject(data);
    }

    /**
     * 更新玩家背包数据 / Update player bag data
     */
    public updatePlayerBagData(userId: string, data: IPlayerBagData) {
        this._playerBagData.get(userId)?.setSubject(data);
    }

    /**
     * 清空玩家数据 / Clear player data
     */
    public clearPlayerData() {
        this._playerData.clear();
    }

    /**
     * 清空玩家背包数据 / Clear player bag data
     */
    public clearPlayerBagData() {
        this._playerBagData.clear();
    }

    /**
     * 获取玩家数据列表 / Get player data list
     */
    public getPlayerDataList(): Map<string, Observer<IPlayerData>> {
        return this._playerData;
    }

    /**
     * 获取玩家背包数据列表 / Get player bag data list
     */
    public getPlayerBagDataList(): Map<string, Observer<IPlayerBagData>> {
        return this._playerBagData;
    }

    /**
     * 清除登出数据 / Clear logout data
     */
    private async clearLogoutData(): Promise<void> {
        for (const [userId, playerData] of this._playerData) {
            const subject = playerData.getSubject();
            const subjectBag = this._playerBagData.get(userId)?.getSubject();
            const playerDataTemp = (await StorageMgr.instance.load(
                StorageConst.PLAYER_DATA,
                userId
            )) as unknown as IPlayerData;

            // 如果玩家不存在，则清除数据 / If the player does not exist, clear the data
            if (
                !PlayerMgr.instance.getPlayer(userId) &&
                subject.lastLogoutTime > 0 &&
                playerDataTemp.lastLoginTime <= subject.lastLoginTime &&
                subject.lastLogoutTime < Date.now() - this._clearTime
            ) {
                playerData.setSubject({
                    ...subject,
                });
                if (subjectBag) {
                    this._playerBagData.get(userId)?.setSubject({
                        ...subjectBag,
                    });
                }
                this.removePlayerData(userId);
                this.removePlayerBagData(userId);
            }
        }
    }
}
