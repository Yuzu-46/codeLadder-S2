import { Singleton } from '../../framework/common/Singleton';
import type {
    RemoteData,
    RemoteType,
    RemoteDataType,
} from '../../../../shares/App';

export class RemoteMgr extends Singleton<RemoteMgr>() {
    constructor() {
        super();
        console.log('(Server) RemoteMgr constructor');
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
        console.log('(Server) RemoteMgr start');
        this.bindEvents();
    }

    /**
     * 绑定事件 / Bind events
     */
    private bindEvents(): void {
        remoteChannel.onServerEvent((event) => {});
    }

    /**
     * 服务器事件处理 / Server event handler
     * @param handler 事件处理函数 / Event handler function
     */
    public onServerEvent(
        handler: (event: {
            /**
             * @zh 服务端当前时间
             * @en The current server time (tick).
             */
            tick: number;
            /**
             * @zh 发送者实体
             * @en The sender entity.
             */
            entity: GamePlayerEntity;
            /**
             * @zh 事件参数
             * @en The event arguments.
             */
            args: RemoteDataType;
        }) => void
    ): GameEventHandlerToken {
        return remoteChannel.onServerEvent<RemoteDataType>(handler);
    }

    /**
     * 发送数据给玩家 / Send data to player
     * @param entities 玩家实体 / Player entity
     * @param data 数据 / Data
     */
    public send<T>(
        entities: GamePlayerEntity | GamePlayerEntity[],
        data: RemoteData<T>
    ) {
        remoteChannel.sendClientEvent<RemoteData<T>>(entities, data);
    }

    /**
     * 发送数据给所有玩家 / Send data to all players
     * @param data 数据 / Data
     */
    public sendAll<T>(data: RemoteData<T>) {
        remoteChannel.broadcastClientEvent<RemoteData<T>>(data);
    }
}
