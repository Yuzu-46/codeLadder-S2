import { factory } from '../../framework/common/factory/AbstractFactory';
import { Singleton } from '../../framework/common/Singleton';
import type { StorageKey } from '../const/StorageConst';
import { StorageConst } from '../const/StorageConst';
import { PlayerType } from '../const/TokenConst';
import type { IBagItem, IPlayerBagData, IPlayerData } from '../data/PlayerData';
import type { IBasePlayer } from '../entity/player/BasePlayer';
import { InGamePlayer } from '../entity/player/GamePlayer';
import { OBPlayer } from '../entity/player/OBPlayer';
import { PlayerDataMgr } from './PlayerDataMgr';
import { RemoteMgr } from './RemoteMgr';
import { StorageMgr } from './StorageMgr';

/**
 * 玩家管理器 / Player Manager
 * 负责管理游戏中的所有玩家实例，包括游戏玩家和观察者玩家
 * Manages all player instances in the game, including game players and observer players
 */

export class PlayerMgr extends Singleton<PlayerMgr>() {
    // 玩家映射表，以用户ID为键存储玩家实例 / Player map storing player instances with user ID as key
    private players: Map<string, IBasePlayer> = new Map<string, IBasePlayer>();

    constructor() {
        super();
        console.log('(Server) PlayerMgr constructor');
    }

    private static _instance: PlayerMgr | null = null;

    public static getInstance(): PlayerMgr {
        if (!this._instance) {
            this._instance = new PlayerMgr();
        }
        return this._instance;
    }

    /**
     * 启动玩家管理器 / Start the player manager
     * 初始化事件绑定和玩家类型注册
     * Initialize event bindings and player type registration
     */
    public start(): void {
        console.log('(Server) PlayerMgr start');
        this.bindEvents();
    }

    /**
     * 更新所有玩家状态 / Update all player states
     * @param tick 游戏时间戳 / Game timestamp
     */
    public update(tick: number): void {
        for (const player of this.players.values()) {
            player.update(tick);
        }
    }

    /**
     * 销毁玩家管理器 / Destroy the player manager
     * 清理所有玩家数据
     * Clean up all player data
     */
    public destroy(): void {
        this.players.clear();
    }

    /**
     * 绑定游戏事件 / Bind game events
     * 注册玩家类型并设置事件监听器
     * Register player types and set up event listeners
     */
    public bindEvents(): void {
        // 注册玩家类型 / Register player types
        factory.registerByToken(PlayerType.GamePlayer as string, InGamePlayer, {
            singleton: false,
            token: PlayerType.GamePlayer,
        });
        factory.registerByToken(PlayerType.OBPlayer as string, OBPlayer, {
            singleton: false,
            token: PlayerType.OBPlayer,
        });

        // 玩家加入事件 / Player join event
        world.onPlayerJoin(({ entity, tick }) => {
            this.registerPlayer(entity);
        });

        // 玩家离开事件 / Player leave event
        world.onPlayerLeave(({ entity, tick }) => {
            this.unregisterPlayer(entity.player.userId);
        });

        // 点击事件 / Click event
        world.onClick((event: GameClickEvent) => {
            console.log('(Server) PlayerMgr onClick', event);
            const { clicker } = event;
            const player = this.getPlayer(clicker?.player?.userId as string);
            if (player) {
                player.onClick(event);
            }
        });

        // 按键事件 / Key press event
        world.onPress((event: GameInputEvent) => {
            const { entity } = event;
            const player = this.getPlayer(entity?.player?.userId as string);
            if (player) {
                player.onPress(event);
            }
        });

        world.onRelease((event: GameInputEvent) => {
            const { entity } = event;
            const player = this.getPlayer(entity?.player?.userId as string);
            if (player) {
                player.onRelease(event);
            }
        });

        world.onDie((event: GameDieEvent) => {
            const { entity } = event;
            const player = this.getPlayer(entity?.player?.userId as string);
            if (player) {
                player.onDie(event);
            }
        });

        RemoteMgr.instance.onServerEvent((event) => {
            const { entity } = event;
            const player = this.getPlayer(entity?.player?.userId as string);
            if (player) {
                player.onServerEvent(event);
            }
        });

        world.onChat((event: GameChatEvent) => {
            const { entity } = event;
            const player = this.getPlayer(entity?.player?.userId as string);
            if (player) {
                player.onChat(event);
            }
        });

        setInterval(() => {
            this.players.forEach((player) => {
                player.checkGameState();
            });
        }, 1000 * 60);
    }

    /**
     * 注册新玩家 / Register a new player
     * @param entity 游戏玩家实体 / Game player entity
     * @returns 创建的玩家实例 / Created player instance
     */
    public async registerPlayer(
        entity: GamePlayerEntity
    ): Promise<IBasePlayer> {
        let data = await this.loadPlayerData(entity?.player?.userId as string);
        data = this.checkPlayerData(entity?.player?.userId as string, data);
        // 初始化玩家数据 / Initialize player data
        PlayerDataMgr.instance.addPlayerData(
            entity?.player?.userId as string,
            data.get(StorageConst.PLAYER_DATA) as unknown as IPlayerData
        );
        PlayerDataMgr.instance.addPlayerBagData(
            entity?.player?.userId as string,
            data.get(StorageConst.PLAYER_BAG_DATA) as unknown as IPlayerBagData
        );

        const playerData = PlayerDataMgr.instance.getPlayerData(
            entity?.player?.userId as string
        );
        const playerBagData = PlayerDataMgr.instance.getPlayerBagData(
            entity?.player?.userId as string
        );

        playerData?.addListener((data) => {
            StorageMgr.instance.save(
                StorageConst.PLAYER_DATA,
                entity?.player?.userId as string,
                data as unknown as JSONValue
            );
        });
        playerBagData?.addListener((data) => {
            StorageMgr.instance.save(
                StorageConst.PLAYER_BAG_DATA,
                entity?.player?.userId as string,
                data as unknown as JSONValue
            );
        });

        // 默认创建游戏玩家 / Create observer player by default
        //如果当前玩法没有等待玩家，可以改为直接创建游戏玩家 / If the current game mode has no waiting player, it can be changed to directly create a game player
        const player = factory.createByToken(
            PlayerType.GamePlayer as string
        ) as IBasePlayer;
        player.init(entity);
        player.start();
        this.players.set(player.userId, player);
        console.log(`(Server) PlayerMgr registerPlayer: ${player.userId}`);
        return player;
    }

    /**
     * 加载玩家数据 / Load player data
     * @param userId 用户ID / User ID
     * @returns 玩家数据 / Player data
     */
    public async loadPlayerData(
        userId: string
    ): Promise<Map<StorageKey, JSONValue>> {
        return await StorageMgr.instance.loadMulti(
            [StorageConst.PLAYER_DATA, StorageConst.PLAYER_BAG_DATA],
            userId
        );
    }

    /**
     * 检查玩家数据 / Check player data
     * @param data 玩家数据 / Player data
     * @returns 玩家数据 / Player data
     */
    public checkPlayerData(
        userId: string,
        data: Map<StorageKey, JSONValue>
    ): Map<StorageKey, JSONValue> {
        if (!data) {
            data = new Map<StorageKey, JSONValue>();
        }

        const playerData = data.get(
            StorageConst.PLAYER_DATA
        ) as unknown as IPlayerData;
        if (!playerData) {
            data.set(StorageConst.PLAYER_DATA, (<IPlayerData>{
                playCount: 0,
                candy: 0,
                lastLoginTime: Date.now(),
                lastLogoutTime: Date.now(),
            }) as unknown as JSONValue);

            StorageMgr.instance.save(
                StorageConst.PLAYER_DATA,
                userId,
                data.get(StorageConst.PLAYER_DATA) as unknown as JSONValue
            );
        }
        const playerBagData = data.get(
            StorageConst.PLAYER_BAG_DATA
        ) as unknown as IPlayerBagData;
        if (!playerBagData) {
            data.set(StorageConst.PLAYER_BAG_DATA, (<IPlayerBagData>{
                items: [],
            }) as unknown as JSONValue);

            StorageMgr.instance.save(
                StorageConst.PLAYER_BAG_DATA,
                userId,
                data.get(StorageConst.PLAYER_BAG_DATA) as unknown as JSONValue
            );
        }
        return data;
    }

    /**
     * 获取指定玩家 / Get player by user ID
     * @param userId 用户ID / User ID
     * @returns 玩家实例或undefined / Player instance or undefined
     */
    public getPlayer(userId: string): IBasePlayer | undefined {
        return this.players.get(userId);
    }

    /**
     * 获取所有玩家 / Get all players
     * @returns 玩家实例数组 / Array of player instances
     */
    public getAllPlayers(): IBasePlayer[] {
        return Array.from(this.players.values());
    }

    /**
     * 更改玩家类型 / Change player type
     * @param userId 用户ID / User ID
     * @param type 新的玩家类型 / New player type
     */
    public changePlayerType(userId: string, type: PlayerType): void {
        const player = this.getPlayer(userId);
        if (player) {
            // 先注销当前玩家 / Unregister current player first
            this.unregisterPlayer(userId);
            // 创建新类型的玩家 / Create new player of specified type
            const newPlayer = factory.createByToken(
                type as string
            ) as IBasePlayer;
            newPlayer.init(player.entity!);
            newPlayer.start();
            this.players.set(userId, newPlayer);
        }
    }

    /**
     * 注销玩家 / Unregister player
     * @param userId 用户ID / User ID
     */
    public unregisterPlayer(userId: string): void {
        const player = this.getPlayer(userId);
        if (player) {
            player.destroy();
        }

        const playerData = PlayerDataMgr.instance.getPlayerData(userId);
        const playerBagData = PlayerDataMgr.instance.getPlayerBagData(userId);
        if (playerData) {
            const subject = playerData.getSubject();
            playerData.setSubject({
                ...subject,
                lastLogoutTime: Date.now(),
            });
        }
        if (playerBagData) {
            const subject = playerBagData.getSubject();
            playerBagData.setSubject({
                ...subject,
            });
        }

        this.players.delete(userId);
    }
}
