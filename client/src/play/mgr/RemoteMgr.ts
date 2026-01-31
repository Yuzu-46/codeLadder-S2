import { Singleton } from '../../framework/common/Singleton';
import type { RemoteData, RemoteDataType } from '../../../../shares/App';

export class RemoteMgr extends Singleton<RemoteMgr>() {
    constructor() {
        super();
    }

    private static _instance: RemoteMgr | null = null;

    public static getInstance(): RemoteMgr {
        if (!this._instance) {
            this._instance = new RemoteMgr();
        }
        return this._instance;
    }

    /**
     * 启动远程管理器 / Start the remote manager
     */
    public start(): void {
        console.log('(Client) RemoteMgr start');
        this.bindEvents();
    }

    /**
     * 绑定事件 / Bind events
     */
    private bindEvents(): void {}

    /**
     * 服务器事件处理 / Client event handler
     * @param handler 处理函数 / Handler
     */
    public onClientEvent(handler: (event: RemoteDataType) => void): void {
        return remoteChannel.onClientEvent<RemoteDataType>(handler);
    }

    /**
     * 发送数据给玩家 / Send data to player
     * @param entities 玩家实体 / Player entity
     * @param data 数据 / Data
     */
    public send<T>(data: RemoteData<T>) {
        remoteChannel.sendServerEvent<RemoteData<T>>(data);
    }
}
