import { Singleton } from '../../framework/common/Singleton';
import type { StorageKey } from '../const/StorageConst';

export class StorageMgr extends Singleton<StorageMgr>() {
    /**
     * 存储映射表 / Storage map
     */
    private _storageMap: Map<string, GameDataStorage<JSONValue>> = new Map();

    /**
     * 设置数据 / Set data
     * @param key
     * @param value
     */
    private set(key: string, value: GameDataStorage<JSONValue>): void {
        this._storageMap.set(key, value);
    }

    /**
     * 获取数据 / Get data
     * @param key
     * @returns
     */
    private get(key: string): GameDataStorage<JSONValue> | undefined {
        return this._storageMap.get(key);
    }

    /**
     * 删除数据 / Remove data
     * @param key
     */
    private remove(key: string): void {
        this._storageMap.delete(key);
    }

    /**
     * 清空数据 / Clear data
     */
    public clear(): void {
        this._storageMap.clear();
    }

    /**
     * 加载数据 / Load data
     * @param key
     * @param userId
     * @param isGroup 是否为群组 / Is group
     * @returns
     */
    public async load(
        key: StorageKey,
        userId: string,
        isGroup: boolean = false
    ): Promise<JSONValue | undefined> {
        let storageTemp = this.get(key);
        if (!storageTemp && !isGroup) {
            if (!storageTemp) {
                storageTemp = storage.getDataStorage(key);
            } else {
                storageTemp = storage.getGroupStorage(key);
            }
            if (storageTemp) {
                this.set(key, storageTemp);
            }
        }
        if (!storageTemp) {
            return undefined;
        }
        const data = await storageTemp?.get(userId);
        console.log(
            '(Server) StorageMgr load',
            key,
            userId,
            JSON.stringify(data)
        );
        return data?.value;
    }

    /**
     * 保存数据 / Save data
     * @param key
     * @param userId
     * @param value
     */
    public async save(
        key: StorageKey,
        userId: string,
        value: JSONValue,
        isGroup: boolean = false
    ): Promise<void> {
        let storageTemp = this.get(key);
        if (!storageTemp) {
            if (!isGroup) {
                storageTemp = storage.getDataStorage(key);
            } else {
                storageTemp = storage.getGroupStorage(key);
            }
            if (storageTemp) {
                this.set(key, storageTemp);
            }
        }
        await storageTemp?.set(userId, value);
    }

    /**
     * 批量加载数据 / Load multiple data
     * @param keys
     * @param userId
     * @returns
     */
    public async loadMulti(
        keys: StorageKey[],
        userId: string,
        isGroup: boolean = false
    ): Promise<Map<StorageKey, JSONValue>> {
        const map = new Map<StorageKey, JSONValue>();
        for (const key of keys) {
            const data = await this.load(key, userId, isGroup);
            if (data) {
                map.set(key, data);
            }
        }
        return map;
    }

    /**
     * 删除数据 / Remove data
     * @param key
     * @param userId
     */
    public removeStorage(key: StorageKey, userId: string): void {
        const storageTemp = this.get(key);
        if (storageTemp) {
            storageTemp.remove(userId);
        }
    }
}
