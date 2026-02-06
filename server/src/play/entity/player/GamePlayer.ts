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
import type {
    ICarryingProp,
    IPlayerCarryingPropData,
} from '../../data/GamePlayerData';
import { InteractableMgr } from '../../mgr/InteractableMgr';
import { MovablePropConfig } from '../../config/MovablePropConfig';
import type { IContainerPropData } from '../../data/MovablePropData';
import type { ContainerState, ContainerType } from '../../const/ContainerConst';
import type { FoodState, IngredientType } from '../../const/FoodConst';

/**
 * 玩家参与游戏
 */
@FactoryToken(PlayerType.GamePlayer)
export class InGamePlayer extends BasePlayer {
    // 由于与GameAPI.d.ts中定义的GamePlayer类型重名，无法使用，故使用InGamePlayer

    /**
     * 携带的道具 / Carrying prop
     */
    public carryingProp: IPlayerCarryingPropData = {
        container: null,
        foods: [],
    };

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

    /**
     * 在指定位置放置道具 / Place a prop at the specified position
     * @param position 位置 / Position
     */
    public async placeProp(position: GameVector3): Promise<void> {
        if (this.carryingProp) {
            if (this.carryingProp.container) {
                const config = MovablePropConfig.data[
                    this.carryingProp.container.type
                ] as IContainerPropData;
                InteractableMgr.instance.createInteractable({
                    ...config.interactableConfig,
                    entityConfig: {
                        mesh: config.mesh,
                        position,
                        ...config.interactableConfig.entityConfig,
                    },
                });
            }
            this.carryingProp.foods.forEach((prop) => {
                const config = MovablePropConfig.data[
                    prop.type
                ] as IContainerPropData;
                InteractableMgr.instance.createInteractable({
                    ...config.interactableConfig,
                    entityConfig: {
                        mesh: config.mesh,
                        position,
                        ...config.interactableConfig.entityConfig,
                    },
                });
            });
            this.carryingProp = {
                container: null,
                foods: [],
            };
            this.entity?.player
                .wearables(GameBodyPart.TORSO)
                .forEach((wearable) => wearable.remove());
        }
    }

    /**
     * 拿起道具 / Pick up a prop
     * @param propData 道具数据 / Prop data
     */
    public pickUpProp(propData: IPlayerCarryingPropData): void {
        if (propData.container) {
            // 如果玩家正在携带容器道具且准备拿起容器道具，则抛出错误。否则拿起容器道具
            if (this.carryingProp.container) {
                throw new Error(
                    'Cannot pick up a container while carrying a container'
                );
            } else {
                this.addPropWearable(propData.container?.type);
                this.carryingProp.container = {
                    type: propData.container.type,
                    state: propData.container.state,
                };
            }
        }
        if (propData.foods.length) {
            this.carryingProp.foods.push(...propData.foods);
            // TODO: 添加食物
        }
        console.log(
            '(Server) GamePlayer carryingProp:',
            JSON.stringify(this.carryingProp)
        );
    }

    /**
     * 添加道具穿戴 / Add prop wearble
     * @param propType
     */
    private addPropWearable(propType: ContainerType | IngredientType): void {
        this.entity?.player.addWearable({
            bodyPart: GameBodyPart.TORSO,
            mesh: MovablePropConfig.data[propType].mesh,
            ...MovablePropConfig.data[propType].wearableConfig,
        });
    }
}
