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
import type { ContainerState, ContainerType } from '../../const/ContainerConst';
import type {
    FoodType,
    IngredientState,
    IngredientType,
} from '../../const/FoodConst';
import { FoodConfig } from '../../config/FoodConfig';
import type { IRecipeConfig } from '../../data/FoodData';
import type { IMovablePropData } from '../../data/MovablePropData';

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

    /**
     * 携带食材可合成配方的食物 / Carrying food that can be combined with
     */
    public creatableFood: FoodType | null = null;

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
        if (this.carryingProp.container) {
            const config = MovablePropConfig.data[
                this.carryingProp.container.type
            ] as IMovablePropData;
            InteractableMgr.instance.createInteractable({
                ...config.interactableConfig,
                entityConfig: {
                    mesh: config.mesh,
                    position,
                    ...config.interactableConfig.entityConfig,
                },
            });
        }

        if (this.carryingProp.foods.length) {
            let config: IMovablePropData | null = null;
            if (this.creatableFood) {
                config = MovablePropConfig.data[
                    this.creatableFood
                ] as IMovablePropData;
            } else {
                config = MovablePropConfig.data[
                    this.carryingProp.foods[0].type
                ] as IMovablePropData;
            }
            InteractableMgr.instance.createInteractable({
                ...config.interactableConfig,
                entityConfig: {
                    mesh: config.mesh,
                    position,
                    ...config.interactableConfig.entityConfig,
                },
            });
        }

        this.carryingProp = {
            container: null,
            foods: [],
        };
        this.creatableFood = null;
        this.entity?.player
            .wearables(GameBodyPart.TORSO)
            .forEach((wearable) => wearable.remove());
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
                this.addPropWearable(propData.container);
                this.carryingProp.container = propData.container;
            }
        }
        if (propData.foods.length) {
            this.carryingProp.foods.push(...propData.foods);

            // 查找可以合成的配方
            const creatableFood = this.findCreatableRecipe();
            if (creatableFood) {
                console.log(
                    `(Server) Found creatable recipe: ${creatableFood}`
                );
                this.addPropWearable({ type: creatableFood });
                this.creatableFood = creatableFood;
            } else {
                this.addPropWearable(propData.foods[0]);
                this.creatableFood = null;
            }
        }
        console.log(
            '(Server) GamePlayer carryingProp:',
            JSON.stringify(this.carryingProp)
        );
        console.log(
            '(Server) GamePlayer creatableFood:',
            this.creatableFood || 'None'
        );
    }

    /**
     * 查找可以合成的配方 / Find creatable recipe
     * @returns 可以合成的食物类型，如果没有则返回null / Creatable food type, or null if none
     */
    private findCreatableRecipe(): FoodType | null {
        const carryingFoods = [...this.carryingProp.foods];

        // 遍历所有配方
        for (const [foodType, { recipe }] of Object.entries(FoodConfig.food)) {
            if (this.canCreateRecipe(recipe, carryingFoods)) {
                return foodType as FoodType;
            }
        }

        return null;
    }

    /**
     * 检查是否可以创建指定配方 / Check if specified recipe can be created
     * @param recipe 配方配置 / Recipe configuration
     * @param carryingFoods 携带的食材数据 / Carrying food data
     * @returns 是否可以创建 / Whether it can be created
     */
    private canCreateRecipe(
        recipe: IRecipeConfig[],
        carryingFoods: ICarryingProp<IngredientType, IngredientState>[]
    ): boolean {
        // 创建食材需求统计
        const requiredIngredients = new Map<string, number>();

        // 统计配方所需的各种食材及其数量和状态
        recipe.forEach((ingredient) => {
            const key = `${ingredient.type}_${ingredient.state}`;
            requiredIngredients.set(
                key,
                (requiredIngredients.get(key) || 0) + ingredient.count
            );
        });

        // 用玩家携带的食材数据减去配方所需的食材数据
        for (const food of carryingFoods) {
            const key = `${food.type}_${food.state}`;
            const currentRequiredCount =
                (requiredIngredients.get(key) || 0) - 1;
            if (currentRequiredCount < 0) {
                return false;
            }
            requiredIngredients.set(key, currentRequiredCount);
        }

        // 检查是否满足所有需求
        for (const [key, count] of requiredIngredients) {
            if (count > 0 || count < 0) {
                return false;
            }
        }

        return true;
    }
    /**
     * 添加道具穿戴 / Add prop wearble
     * @param propData 道具数据 / Prop data
     */
    private addPropWearable(
        propData:
            | ICarryingProp<ContainerType, ContainerState>
            | ICarryingProp<IngredientType, IngredientState>
            | { type: FoodType }
    ): void {
        this.entity?.player.addWearable({
            bodyPart: GameBodyPart.TORSO,
            mesh: MovablePropConfig.data[propData.type].mesh,
            ...MovablePropConfig.data[propData.type].wearableConfig,
        });
    }
}
