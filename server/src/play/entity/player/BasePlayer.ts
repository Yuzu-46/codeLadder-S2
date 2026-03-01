import type { Language } from '../../../../../shares/data/Language';
import {
    RemoteType,
    ServerEvents,
    type RemoteData,
    type RemoteDataType,
} from '../../../../../shares/App';
import { PlayerGameState } from '../../const/GamePlayerConst';

/**
 * 基础玩家接口 / Base Player Interface
 * 定义了玩家对象的基本行为和方法 / Defines the basic behavior and methods for player objects
 */
export interface IBasePlayer {
    /**
     * 用户ID / User ID
     */
    userId: string;

    /**
     * 玩家实体对象 / Player entity object
     */
    entity: GamePlayerEntity | null;

    /**
     * 语言 / Language
     */
    get lng(): string;

    /**
     * 游戏状态 / Game state
     */
    gameState: PlayerGameState;

    /**
     * 设置语言 / Set language
     * @param lng 语言字符串 / Language string
     */
    set lng(lng: string);

    /**
     * 初始化玩家实体 / Initialize player entity
     * @param entity 游戏玩家实体对象 / Game player entity object
     */
    init(entity: GamePlayerEntity): void;

    // /**
    //  * 初始化玩家数据 / Initialize player data
    //  * @param data 玩家数据 / Player data
    //  */
    // initData(data: Map<StorageKey, JSONValue>): void;

    /**
     * 启动玩家 / Start player
     */
    start(): void;

    /**
     * 更新玩家状态 / Update player state
     * @param delta 时间增量（秒）/ Time delta in seconds
     */
    update(delta: number): void;

    /**
     * 销毁玩家 / Destroy player
     */
    destroy(): void;

    /**
     * 按下按钮 / Press button
     * @param event 事件对象 / Event object
     */
    onPress(event: GameInputEvent): unknown;

    /**
     * 释放按钮 / Release button
     * @param event 事件对象 / Event object
     */
    onRelease(event: GameInputEvent): unknown;

    /**
     * 点击按钮 / Click button
     * @param event 事件对象 / Event object
     */
    onClick(event: GameClickEvent): unknown;

    /**
     * 死亡 / Player death event handling
     * @param event 事件对象 / Event object
     */
    onDie(event: GameDieEvent): unknown;

    /**
     * 服务器通讯事件处理 / Server event handling
     * @param event 事件对象 / Event object
     */
    onServerEvent(event: {
        tick: number;
        entity: GamePlayerEntity;
        args: RemoteDataType;
    }): unknown;

    /**
     * 聊天 / Chat
     * @param event 事件对象 / Event object
     */
    onChat(event: GameChatEvent): unknown;

    /**
     * 检查玩家游玩状态 / Check if player is in playing state
     */
    checkGameState(): unknown;
}

/**
 * 基础玩家类 / Base Player Class
 * 实现玩家对象的基本功能 / Implements basic functionality for player objects
 */
export class BasePlayer implements IBasePlayer {
    /**
     * 用户ID / User ID
     */
    protected _userId: string = '';

    /**
     * 玩家实体对象 / Player entity object
     */
    protected _entity: GamePlayerEntity | null = null;

    /**
     * 语言 / Language
     */
    protected _lng: string = 'zh-CN';

    /**
     * 玩家状态 / Player state
     */
    private _gameState: PlayerGameState = PlayerGameState.SUSPECTED_AFK;

    /**
     * 按钮点击事件映射 / Button click event mapping
     */
    protected _btnClickEventMap: Map<
        GameButtonType,
        (event: GameClickEvent) => void
    > = new Map();

    /**
     * 按钮按下事件映射 / Button press event mapping
     */
    protected _btnPressEventMap: Map<
        GameButtonType,
        (event: GameInputEvent) => void
    > = new Map();

    /**
     * 按钮释放事件映射 / Button release event mapping
     */
    protected _btnReleaseEventMap: Map<
        GameButtonType,
        (event: GameInputEvent) => void
    > = new Map();

    /**
     * 动作0按钮按下状态 / Action0 button press state
     */
    protected _isPressingAction0: boolean = false;

    /**
     * 动作1按钮按下状态 / Action1 button press state
     */
    protected _isPressingAction1: boolean = false;

    /**
     * 蹲下按钮按下状态 / Crouch button press state
     */
    protected _isPressingCrouch: boolean = false;

    /**
     * 跳跃按钮按下状态 / Jump button press state
     */
    protected _isPressingJump: boolean = false;

    /**
     * 二段跳按钮按下状态 / Double jump button press state
     */
    protected _isPressingDoubleJump: boolean = false;

    /**
     * 飞行按钮按下状态 / Fly button press state
     */
    protected _isPressingFly: boolean = false;

    /**
     * 奔跑按钮按下状态 / Run button press state
     */
    protected _isPressingRun: boolean = false;

    /**
     * 行走按钮按下状态 / Walk button press state
     */
    protected _isPressingWalk: boolean = false;

    /**
     * 玩家数据索引 / Player data index
     */
    protected _playerDataIdx: number = 0;

    /**
     * 玩家背包数据索引 / Player bag data index
     */
    protected _playerBagDataIdx: number = 0;

    /**
     * 构造函数 / Constructor
     */
    constructor() {}

    /**
     * 初始化玩家实体 / Initialize player entity
     * @param entity 游戏玩家实体对象 / Game player entity object
     */
    public init(entity: GamePlayerEntity): void {
        this._userId = entity.player.userId;
        this._entity = entity;
        this.bindBtnEvent();
    }

    // /**
    //  * 初始化玩家数据 / Initialize player data
    //  * @param data 玩家数据 / Player data
    //  */
    // public initData(data: Map<StorageKey, JSONValue>): void {
    //     // 初始化玩家数据 / Initialize player data
    //     if (data.get(StorageConst.PLAYER_DATA)) {
    //         this._playerData = new Observer<IPlayerData>(data.get(StorageConst.PLAYER_DATA) as unknown as IPlayerData);
    //         this._playerDataIdx = this._playerData.addListener((data) => {
    //             console.log("(Server) Player data changed", data);
    //             StorageMgr.instance.save(StorageConst.PLAYER_DATA, this._userId, data as unknown as JSONValue);
    //         });
    //     }
    //     // 初始化玩家背包数据 / Initialize player bag data
    //     if (data.get(StorageConst.PLAYER_BAG_DATA)) {
    //         this._playerBagData = new Observer<IPlayerBagData>(data.get(StorageConst.PLAYER_BAG_DATA) as unknown as IPlayerBagData);
    //         this._playerBagDataIdx = this._playerBagData.addListener((data) => {
    //             console.log("(Server) Player bag data changed", data);
    //             StorageMgr.instance.save(StorageConst.PLAYER_BAG_DATA, this._userId, data as unknown as JSONValue);
    //         });
    //     }
    // }

    /**
     * 获取用户ID / Get user ID
     * @returns 用户ID字符串 / User ID string
     */
    public get userId(): string {
        return this._userId;
    }

    /**
     * 获取玩家实体对象 / Get player entity object
     * @returns 玩家实体对象或null / Player entity object or null
     */
    public get entity(): GamePlayerEntity | null {
        return this._entity;
    }

    /**
     * 获取语言 / Get language
     * @returns 语言字符串 / Language string
     */
    public get lng(): string {
        return this._lng;
    }

    /**
     * 设置语言 / Set language
     * @param lng 语言字符串 / Language string
     */
    public set lng(lng: string) {
        this._lng = lng;
    }

    /**
     * 获取玩家状态 / Get player state
     * @returns 玩家状态 / Player state
     */
    public get gameState(): PlayerGameState {
        return this._gameState;
    }

    /**
     * 设置玩家状态 / Set player state
     * @param state 玩家状态 / Player state
     */
    public set gameState(state: PlayerGameState) {
        this._gameState = state;
    }

    /**
     * 启动玩家 / Start player
     */
    public start(): void {}

    /**
     * 更新玩家状态 / Update player state
     * @param delta 时间增量（秒）/ Time delta in seconds
     */
    public update(delta: number): void {
        // console.log(`(Server) Player update: ${delta}`);
    }

    /**
     * 销毁玩家 / Destroy player
     */
    public destroy(): void {}

    public onClick(event: GameClickEvent): void {
        const { button } = event;
        const btnEvent = this.getBtnClickEvent(button as GameButtonType);
        if (btnEvent) {
            btnEvent(event);
        }
        this.gameState = PlayerGameState.PLAYING;
    }

    /**
     * 处理按钮按下事件 / Handle button press event
     * @param event 输入事件对象 / Input event object
     */
    public onPress(event: GameInputEvent): void {
        const { button } = event;
        const btnEvent = this.getBtnPressEvent(button as GameButtonType);
        if (btnEvent) {
            btnEvent(event);
        }
        this.gameState = PlayerGameState.PLAYING;
    }

    /**
     * 处理按钮释放事件 / Handle button release event
     * @param event 输入事件对象 / Input event object
     */
    public onRelease(event: GameInputEvent): void {
        const { button } = event;
        const btnEvent = this.getBtnReleaseEvent(button as GameButtonType);
        if (btnEvent) {
            btnEvent(event);
        }
        this.gameState = PlayerGameState.PLAYING;
    }

    /**
     * 处理玩家死亡事件 / Handle player death event
     * @param event 死亡事件对象 / Death event object
     */
    public onDie(event: GameDieEvent): void {}

    /**
     * 处理服务器事件 / Handle server event
     * @param event 服务器事件对象 / Server event object
     */
    public onServerEvent(event: {
        tick: number;
        entity: GamePlayerEntity;
        args: RemoteDataType;
    }) {
        if (event.args.type === ServerEvents.LANGUAGE) {
            const args = event.args as RemoteData<Language>;
            this.lng = args.data.lng;
        }
    }

    /**
     * 处理玩家聊天事件 / Handle player chat event
     * @param event 聊天事件对象 / Chat event object
     */
    public onChat(event: GameChatEvent): void {
        this.gameState = PlayerGameState.PLAYING;
    }

    /**
     * 检查玩家游玩状态 / Check if player is in playing state
     */
    public checkGameState(): void {
        if (this.gameState === PlayerGameState.PLAYING) {
            this.gameState = PlayerGameState.SUSPECTED_AFK;
        } else if (this.gameState === PlayerGameState.SUSPECTED_AFK) {
            this.gameState = PlayerGameState.CONFIRMED_AFK;
        } else if (this.gameState === PlayerGameState.CONFIRMED_AFK) {
            // 已经是确认的挂机状态，不做处理 / Already in confirmed AFK state, do nothing
        }
    }

    /**
     * 添加按钮按下事件 / Add button press event
     * @param button 按钮类型 / Button type
     * @param btnEvent 事件处理函数 / Event handler function
     */
    protected addBtnPressEvent(
        button: GameButtonType,
        btnEvent: (event: GameInputEvent) => void
    ): void {
        this._btnPressEventMap.set(button, btnEvent);
    }

    /**
     * 移除按钮按下事件 / Remove button press event
     * @param button 按钮类型 / Button type
     */
    protected removeBtnPressEvent(button: GameButtonType): void {
        this._btnPressEventMap.delete(button);
    }

    /**
     * 清空所有按钮按下事件 / Clear all button press events
     */
    protected clearBtnPressEvent(): void {
        this._btnPressEventMap.clear();
    }

    /**
     * 获取按钮按下事件 / Get button press event
     * @param button 按钮类型 / Button type
     * @returns 事件处理函数或undefined / Event handler function or undefined
     */
    protected getBtnPressEvent(
        button: GameButtonType
    ): ((event: GameInputEvent) => void) | undefined {
        return this._btnPressEventMap.get(button);
    }

    /**
     * 添加按钮释放事件 / Add button release event
     * @param button 按钮类型 / Button type
     * @param btnEvent 事件处理函数 / Event handler function
     */
    protected addBtnReleaseEvent(
        button: GameButtonType,
        btnEvent: (event: GameInputEvent) => void
    ): void {
        this._btnReleaseEventMap.set(button, btnEvent);
    }

    /**
     * 移除按钮释放事件 / Remove button release event
     * @param button 按钮类型 / Button type
     */
    protected removeBtnReleaseEvent(button: GameButtonType): void {
        this._btnReleaseEventMap.delete(button);
    }

    /**
     * 清空所有按钮释放事件 / Clear all button release events
     */
    protected clearBtnReleaseEvent(): void {
        this._btnReleaseEventMap.clear();
    }

    /**
     * 获取按钮释放事件 / Get button release event
     * @param button 按钮类型 / Button type
     * @returns 事件处理函数或undefined / Event handler function or undefined
     */
    protected getBtnReleaseEvent(
        button: GameButtonType
    ): ((event: GameInputEvent) => void) | undefined {
        return this._btnReleaseEventMap.get(button);
    }

    /**
     * 添加按钮点击事件 / Add button click event
     * @param button 按钮类型 / Button type
     * @param btnEvent 事件处理函数 / Event handler function
     */
    protected addBtnClickEvent(
        button: GameButtonType,
        btnEvent: (event: GameClickEvent) => void
    ): void {
        this._btnClickEventMap.set(button, btnEvent);
    }

    /**
     * 移除按钮点击事件 / Remove button click event
     * @param button 按钮类型 / Button type
     */
    protected removeBtnClickEvent(button: GameButtonType): void {
        this._btnClickEventMap.delete(button);
    }

    /**
     * 清空所有按钮点击事件 / Clear all button click events
     */
    protected clearBtnClickEvent(): void {
        this._btnClickEventMap.clear();
    }

    /**
     * 获取按钮点击事件 / Get button click event
     * @param button 按钮类型 / Button type
     * @returns 事件处理函数或undefined / Event handler function or undefined
     */
    protected getBtnClickEvent(
        button: GameButtonType
    ): ((event: GameClickEvent) => void) | undefined {
        return this._btnClickEventMap.get(button);
    }

    /**
     * 绑定按钮事件 / Bind button events
     * 为所有按钮类型注册按下和释放事件处理函数 / Register press and release event handlers for all button types
     */
    protected bindBtnEvent(): void {
        this.addBtnPressEvent(
            GameButtonType.ACTION0,
            (event: GameInputEvent) => {
                this._isPressingAction0 = true;
                this.btnPressAction0(event);
            }
        );

        this.addBtnPressEvent(
            GameButtonType.ACTION1,
            (event: GameInputEvent) => {
                this._isPressingAction1 = true;
                this.btnPressAction1(event);
            }
        );

        this.addBtnPressEvent(
            GameButtonType.CROUCH,
            (event: GameInputEvent) => {
                this._isPressingCrouch = true;
                this.btnPressCrouch(event);
            }
        );

        this.addBtnPressEvent(GameButtonType.JUMP, (event: GameInputEvent) => {
            this._isPressingJump = true;
            this.btnPressJump(event);
        });

        this.addBtnPressEvent(
            GameButtonType.DOUBLE_JUMP,
            (event: GameInputEvent) => {
                this._isPressingDoubleJump = true;
                this.btnPressDoubleJump(event);
            }
        );

        this.addBtnPressEvent(GameButtonType.FLY, (event: GameInputEvent) => {
            this._isPressingFly = true;
            this.btnPressFly(event);
        });

        this.addBtnPressEvent(GameButtonType.RUN, (event: GameInputEvent) => {
            this._isPressingRun = true;
            this.btnPressRun(event);
        });

        this.addBtnPressEvent(GameButtonType.WALK, (event: GameInputEvent) => {
            this._isPressingWalk = true;
            this.btnPressWalk(event);
        });

        this.addBtnReleaseEvent(
            GameButtonType.ACTION0,
            (event: GameInputEvent) => {
                this._isPressingAction0 = false;
                this.btnReleaseAction0(event);
            }
        );

        this.addBtnReleaseEvent(
            GameButtonType.ACTION1,
            (event: GameInputEvent) => {
                this._isPressingAction1 = false;
                this.btnReleaseAction1(event);
            }
        );

        this.addBtnReleaseEvent(
            GameButtonType.CROUCH,
            (event: GameInputEvent) => {
                this._isPressingCrouch = false;
                this.btnReleaseCrouch(event);
            }
        );

        this.addBtnReleaseEvent(
            GameButtonType.JUMP,
            (event: GameInputEvent) => {
                this._isPressingJump = false;
                this.btnReleaseJump(event);
            }
        );

        this.addBtnReleaseEvent(
            GameButtonType.DOUBLE_JUMP,
            (event: GameInputEvent) => {
                this._isPressingDoubleJump = false;
                this.btnReleaseDoubleJump(event);
            }
        );

        this.addBtnReleaseEvent(GameButtonType.FLY, (event: GameInputEvent) => {
            this._isPressingFly = false;
            this.btnReleaseFly(event);
        });

        this.addBtnReleaseEvent(GameButtonType.RUN, (event: GameInputEvent) => {
            this._isPressingRun = false;
            this.btnReleaseRun(event);
        });

        this.addBtnReleaseEvent(
            GameButtonType.WALK,
            (event: GameInputEvent) => {
                this._isPressingWalk = false;
                this.btnReleaseWalk(event);
            }
        );

        this.addBtnClickEvent(
            GameButtonType.ACTION0,
            (event: GameClickEvent) => {
                this.btnClickAction0(event);
            }
        );

        this.addBtnClickEvent(
            GameButtonType.ACTION1,
            (event: GameClickEvent) => {
                this.btnClickAction1(event);
            }
        );
    }

    /**
     * 动作0按钮按下处理 / Action0 button press handler
     * @param event 输入事件对象 / Input event object
     */
    protected btnPressAction0(event: GameInputEvent): void {
        // console.log("(Server) Player onPress: ACTION0");
    }

    /**
     * 动作1按钮按下处理 / Action1 button press handler
     * @param event 输入事件对象 / Input event object
     */
    protected btnPressAction1(event: GameInputEvent): void {
        // console.log("(Server) Player onPress: ACTION1");
    }

    /**
     * 蹲下按钮按下处理 / Crouch button press handler
     * @param event 输入事件对象 / Input event object
     */
    protected btnPressCrouch(event: GameInputEvent): void {
        // console.log("(Server) Player onPress: CROUCH");
    }

    /**
     * 跳跃按钮按下处理 / Jump button press handler
     * @param event 输入事件对象 / Input event object
     */
    protected btnPressJump(event: GameInputEvent): void {
        // console.log("(Server) Player onPress: JUMP");
    }

    /**
     * 二段跳按钮按下处理 / Double jump button press handler
     * @param event 输入事件对象 / Input event object
     */
    protected btnPressDoubleJump(event: GameInputEvent): void {
        // console.log("(Server) Player onPress: DOUBLE_JUMP");
    }

    /**
     * 飞行按钮按下处理 / Fly button press handler
     * @param event 输入事件对象 / Input event object
     */
    protected btnPressFly(event: GameInputEvent): void {
        // console.log("(Server) Player onPress: FLY");
    }

    /**
     * 奔跑按钮按下处理 / Run button press handler
     * @param event 输入事件对象 / Input event object
     */
    protected btnPressRun(event: GameInputEvent): void {
        // console.log("(Server) Player onPress: RUN");
    }

    /**
     * 行走按钮按下处理 / Walk button press handler
     * @param event 输入事件对象 / Input event object
     */
    protected btnPressWalk(event: GameInputEvent): void {
        // console.log("(Server) Player onPress: WALK");
    }

    /**
     * 动作0按钮释放处理 / Action0 button release handler
     * @param event 输入事件对象 / Input event object
     */
    protected btnReleaseAction0(event: GameInputEvent): void {
        // console.log("(Server) Player onRelease: ACTION0");
    }

    /**
     * 动作1按钮释放处理 / Action1 button release handler
     * @param event 输入事件对象 / Input event object
     */
    protected btnReleaseAction1(event: GameInputEvent): void {
        // console.log("(Server) Player onRelease: ACTION1");
    }

    /**
     * 蹲下按钮释放处理 / Crouch button release handler
     * @param event 输入事件对象 / Input event object
     */
    protected btnReleaseCrouch(event: GameInputEvent): void {
        // console.log("(Server) Player onRelease: CROUCH");
    }

    /**
     * 跳跃按钮释放处理 / Jump button release handler
     * @param event 输入事件对象 / Input event object
     */
    protected btnReleaseJump(event: GameInputEvent): void {
        // console.log("(Server) Player onRelease: JUMP");
    }

    /**
     * 二段跳按钮释放处理 / Double jump button release handler
     * @param event 输入事件对象 / Input event object
     */
    protected btnReleaseDoubleJump(event: GameInputEvent): void {
        // console.log("(Server) Player onRelease: DOUBLE_JUMP");
    }

    /**
     * 飞行按钮释放处理 / Fly button release handler
     * @param event 输入事件对象 / Input event object
     */
    protected btnReleaseFly(event: GameInputEvent): void {
        // console.log("(Server) Player onRelease: FLY");
    }

    /**
     * 奔跑按钮释放处理 / Run button release handler
     * @param event 输入事件对象 / Input event object
     */
    protected btnReleaseRun(event: GameInputEvent): void {
        // console.log("(Server) Player onRelease: RUN");
    }

    /**
     * 行走按钮释放处理 / Walk button release handler
     * @param event 输入事件对象 / Input event object
     */
    protected btnReleaseWalk(event: GameInputEvent): void {
        //console.log("(Server) Player onRelease: WALK");
    }

    /**
     * 动作0按钮点击处理 / Action0 button click handler
     * @param event 点击事件对象 / Click event object
     */
    protected btnClickAction0(event: GameClickEvent): void {
        // console.log("(Server) Player onClick: ACTION0");
    }

    /**
     * 动作1按钮点击处理 / Action1 button click handler
     * @param event 点击事件对象 / Click event object
     */
    protected btnClickAction1(event: GameClickEvent): void {
        // console.log("(Server) Player onClick: ACTION1");
    }
}
