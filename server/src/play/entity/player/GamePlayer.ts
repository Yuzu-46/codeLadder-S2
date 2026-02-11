import { BasePlayer } from './BasePlayer';
import { FactoryToken } from '../../../framework/common/factory/AbstractFactory';
import { PlayerType } from '../../const/TokenConst';
import { PlayerGameState } from '../../const/GamePlayerConst';
import type {
    IPropData,
    IPlayerCarryingPropData,
} from '../../data/GamePlayerData';
import { MovablePropConfig } from '../../config/MovablePropConfig';
import type { ContainerState, ContainerType } from '../../const/ContainerConst';
import type {
    FoodType,
    IngredientState,
    IngredientType,
} from '../../const/FoodConst';
import { PropMeshConfig } from '../../config/PropMeshConfig';
import type { BaseImmovableProp } from '../interactable/prop/immovableProp/BaseImmovableProp';
import { PropMgr } from '../../mgr/PropMgr';
import { EventEmitter } from '../../../framework/common/EventEmitter';
import { PlayerEvent } from '../../const/EventConst';
import type { IPlayerEventData } from '../../data/EventData';

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
        EventEmitter.instance.emit<IPlayerEventData<GameInputEvent>>(
            PlayerEvent.BtnPressAction0,
            {
                player: this,
                event,
            }
        );
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
    public async placeProp(
        position: GameVector3,
        interactable?: BaseImmovableProp
    ): Promise<void> {
        PropMgr.instance.placeProp(this.carryingProp, position, interactable);

        this.carryingProp = {
            container: null,
            foods: [],
        };
        this.clearPropWearable();
    }

    /**
     * 拿起道具 / Pick up a prop
     * @param propData 道具数据 / Prop data
     */
    public pickUpProp(propData: IPlayerCarryingPropData): void {
        // 拿起容器类道具的逻辑
        if (propData.container) {
            // 如果玩家正在携带容器道具且准备拿起容器道具，则抛出错误。否则拿起容器道具
            if (this.carryingProp.container) {
                throw new Error(
                    'Cannot pick up a container while carrying a container'
                );
            } else {
                this.carryingProp.container = propData.container;
            }
        }

        // 拿起食物/食材类道具的逻辑
        if (propData.foods.length) {
            this.carryingProp.foods.push(...propData.foods);
        }

        // 更新玩家穿戴
        this.updatePropWearable();

        console.log(
            '(Server) GamePlayer carryingProp:',
            JSON.stringify(this.carryingProp)
        );
    }

    /**
     * 丢弃食物/食材道具 / Drop food/ingredient prop
     */
    public dropFoodProp(): void {
        this.carryingProp.foods = [];
        this.updatePropWearable();
    }

    /**
     * 添加道具穿戴 / Add prop wearble
     * @param propData 道具数据 / Prop data
     */
    private addPropWearable(
        propData:
            | IPropData<ContainerType, ContainerState>
            | IPropData<IngredientType, IngredientState>
            | IPropData<FoodType, ''>
    ): void {
        const config = MovablePropConfig.data[propData.type].wearableConfig;
        const propMeshConfig = PropMeshConfig[propData.type];
        const mesh =
            propMeshConfig[propData.state as keyof typeof propMeshConfig];
        this.entity?.player.addWearable({
            bodyPart: GameBodyPart.TORSO,
            mesh: mesh,
            ...config,
        });
    }

    /**
     * 清空道具穿戴 / Clear prop wearable
     */
    private clearPropWearable(): void {
        this.entity?.player
            .wearables(GameBodyPart.TORSO)
            .forEach((wearable) => wearable.remove());
    }

    /**
     * 更新道具穿戴 / Update prop wearable
     */
    private updatePropWearable(): void {
        this.clearPropWearable();
        // 添加容器道具穿戴
        if (this.carryingProp.container) {
            this.addPropWearable(this.carryingProp.container);
        }

        // 添加食物/食材道具穿戴
        if (this.carryingProp.foods.length) {
            const creatableFood = PropMgr.instance.findCreatableRecipe(
                this.carryingProp.foods
            );
            if (creatableFood) {
                console.log(
                    `(Server) Found creatable recipe: ${creatableFood}`
                );
                this.addPropWearable({ type: creatableFood, state: '' });
            } else {
                this.addPropWearable(this.carryingProp.foods[0]);
            }
        }
    }
}
