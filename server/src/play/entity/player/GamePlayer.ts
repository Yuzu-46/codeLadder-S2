import { BasePlayer } from './BasePlayer';
import { FactoryToken } from '../../../framework/common/factory/AbstractFactory';
import { PlayerType } from '../../const/TokenConst';
import { PlayerGameState } from '../../const/GamePlayerConst';
import { RemoteMgr } from '../../mgr/RemoteMgr';
import { ClientEvents } from '../../../../../shares/App';
import { EventEmitter } from '../../../framework/common/EventEmitter';
import { Observer } from '../../../framework/common/Observer';
import type { MessageData } from '@shares/data/Message';
import i18n from '@root/i18n';
import type { ICarryingPropData } from '../../data/GamePlayerData';

/**
 * 玩家参与游戏
 */
@FactoryToken(PlayerType.GamePlayer)
export class InGamePlayer extends BasePlayer {
    // 由于与GameAPI.d.ts中定义的GamePlayer类型重名，无法使用，故使用InGamePlayer

    /**
     * 携带的道具 / Carrying prop
     */
    public carryingProp: ICarryingPropData | null = null;

    constructor() {
        super();
    }

    public start(): void {
        super.start();
        console.log('(Server) GamePlayer start');

        this.gameState = PlayerGameState.PLAYING;

        this.bindEvents();
        this.bindKeyEvent();
    }

    /**
     * 绑定事件 / Bind events
     */
    protected bindEvents(): void {}

    /**
     * 绑定按键事件 / Bind key events
     */
    private bindKeyEvent(): void {
        this.entity?.player.onKeyDown((event) => {
            this.onKeyDown(event);
        });
    }

    public update(delta: number): void {
        super.update(delta);
    }

    public destroy(): void {
        super.destroy();
        console.log('(Server) GamePlayer destroy');
    }

    protected btnPressAction0(event: GameInputEvent): void {
        super.btnPressAction0(event);
        console.log('(Server) GamePlayer btnPressAction0');
    }

    public onDie(event: GameDieEvent): void {
        super.onDie(event);
        console.log('(Server) GamePlayer onDie');
    }

    public get gameState(): PlayerGameState {
        return super.gameState;
    }

    public set gameState(state: PlayerGameState) {
        super.gameState = state;
    }

    public checkGameState(): void {
        super.checkGameState();
    }

    /**
     * 按键按下事件处理 / Key down event handler
     * @param event 键盘事件 / Keyboard event
     */
    private onKeyDown(event: GameKeyBoardEvent): void {
        // 如果玩家处于挂机状态，按下任意键后恢复游戏状态
        this.gameState = PlayerGameState.PLAYING;
        // console.log('(Server) GamePlayer onKeyDown, keyCode:', event.keyCode);
    }
}
