import type {
    MachineConfig,
    MachineOptions,
} from '../../../../../../framework/common/state/FiniteStateMachine';
import { FiniteStateMachine } from '../../../../../../framework/common/state/FiniteStateMachine';
import { ConfigMgr } from '../../../../../mgr/ConfigMgr';
import type { IngredientType } from '../../../../../const/FoodConst';
import { FoodEvent } from '../../../../../const/FoodConst';
import { IngredientState } from '../../../../../const/FoodConst';
import type {
    IPlayerCarryingPropData,
    IPropData,
} from '../../../../../data/GamePlayerData';
import type { IIngredientConfig } from '../../../../../data/InteractableData';
import { PlayerMgr } from '../../../../../mgr/PlayerMgr';
import { PropBindingMgr } from '../../../../../mgr/PropBindingMgr';
import { PropMgr } from '../../../../../mgr/PropMgr';
import type { InGamePlayer } from '../../../../player/GamePlayer';
import { BaseMovableProp } from './BaseMovableProp';
import type { BaseContainerProp } from './BaseContainerProp';
import { Observer } from '../../../../../../framework/common/Observer';

/**
 * 食材道具基类 / Base food prop
 */
export abstract class BaseFoodProp extends BaseMovableProp {
    protected _type: IngredientType[] = [];

    /**
     * 有限状态机 / Finite state machine
     */
    protected _fsm: FiniteStateMachine<IngredientState, FoodEvent>[] = [];

    /**
     * 状态观察者 / State observer
     */
    protected _state: Observer<IngredientState | null> | null = new Observer(
        null
    );

    /**
     * 状态机配置 / State machine configuration
     * - 由于不同食材的状态迁移逻辑相同，我们在此处定义一个通用配置，实例化时根据具体类型进行调整。
     */
    private _machineConfig: MachineConfig<IngredientState, FoodEvent> = {
        initial: IngredientState.RAW,
        states: {
            [IngredientState.RAW]: {
                on: {
                    [FoodEvent.CHOP]: {
                        target: IngredientState.CHOPPED,
                        guard: () => {
                            if (this.entity && this.type.length === 1) {
                                this.entity.hp =
                                    (this.entity.hp % this.entity.maxHp) + 1;
                                return this.entity.hp >= this.entity.maxHp;
                            }
                            return false;
                        },
                    },
                },
                onEnter: () => {
                    if (this.entity && this.type.length === 1) {
                        this.entity.maxHp = 3;
                        this.entity.hp = 3;
                    }
                    this.onEnterState(IngredientState.RAW);
                },
            },
            [IngredientState.CHOPPED]: {
                on: {
                    [FoodEvent.COOK]: IngredientState.COOKING,
                },
                onEnter: () => {
                    this.onEnterState(IngredientState.CHOPPED);
                },
            },
            [IngredientState.COOKING]: {
                on: {
                    [FoodEvent.COOK]: {
                        target: IngredientState.COOKED,
                        guard: () => {
                            if (this.entity && this.type.length === 1) {
                                this.entity.hp += 1;
                                return this.entity.hp >= this.entity.maxHp;
                            }
                            return false;
                        },
                    },
                    [FoodEvent.COOK_FINISH]: IngredientState.COOKED,
                },
                onEnter: () => {
                    if (this.entity && this.type.length === 1) {
                        this.entity.maxHp = 84;
                        this.entity.hp = 0;
                    }
                    this.onEnterState(IngredientState.COOKING);
                },
            },
            [IngredientState.COOKED]: {
                on: {
                    [FoodEvent.BURNT]: {
                        target: IngredientState.BURNT,
                        guard: () => {
                            if (this.entity && this.type.length === 1) {
                                this.entity.hp -= 1;
                                return this.entity.hp <= 0;
                            }
                            return false;
                        },
                    },
                    [FoodEvent.BURNT_DIRECTLY]: IngredientState.BURNT,
                },
                onEnter: () => {
                    if (this.entity && this.type.length === 1) {
                        this.entity.maxHp = 72;
                        this.entity.hp = 72;
                    }
                    this.onEnterState(IngredientState.COOKED);
                },
            },
            [IngredientState.BURNT]: {
                onEnter: () => {
                    this.onBurnt();
                    this.onEnterState(IngredientState.BURNT);
                },
            },
        },
    };

    /**
     * 状态机选项 / State machine options
     * - 这里我们添加了一个全局的 onTransition 回调，用于日志记录或其他全局副作用处理。
     */
    private _machineOptions: MachineOptions<IngredientState, FoodEvent> = {
        onTransition: undefined,
    };

    public start(config: IIngredientConfig): void {
        super.start(config);
        this._type = config.type;
        this._fsm = config.state.map(
            (state) =>
                new FiniteStateMachine(
                    {
                        ...this._machineConfig,
                        initial: state,
                    },
                    this._machineOptions
                )
        );
        if (this.entity) {
            this.entity.enableDamage = true;
        }
    }

    public onInteract(event: GameInteractEvent): void {
        const containerId = PropBindingMgr.instance.getBindingDataByPropId(
            this.id
        ).bindingData?.dynamicContainerId;
        if (containerId) {
            this.getInteractable(containerId)?.onInteract(event);
            return;
        }

        const { entity } = event;
        const player = PlayerMgr.instance.getPlayer(
            entity.player.userId
        ) as InGamePlayer;
        if (this.canWear(player.carryingProp)) {
            this.wear(player);
        }
    }

    public destroy(): void {
        super.destroy();
        this._state?.removeAllListeners();
        this._state = null;
    }

    /**
     * 进入状态时的处理逻辑 / Logic to handle when entering a state
     * @param state 当前状态 / Current state
     */
    private onEnterState(state: IngredientState): void {
        if (this.type.length === 1) {
            this._state?.setSubject(state);
        } else {
            this._state?.setSubject(null);
        }
        setTimeout(() => {
            if (this.entity && this.type.length) {
                let mesh: GameModelAssets | undefined,
                    interactHint: string | undefined;

                const createdFood = PropMgr.instance.findCreatableRecipe(
                    this.data
                );
                if (createdFood && this.container?.data?.type === 'plate') {
                    // 只有盘子才能呈现食物
                    ({ mesh, interactHint } =
                        ConfigMgr.instance.getMovablePropConfig(createdFood!)
                            ?.states[''] || {});
                } else {
                    ({ mesh, interactHint } =
                        ConfigMgr.instance.getMovablePropConfig(this.type[0])
                            ?.states[state] || {});
                }

                if (mesh) {
                    this.entity.mesh = mesh;
                }
                if (interactHint) {
                    this.entity.interactHint = interactHint;
                }
            }
        }, 1);
    }

    public wear(player: InGamePlayer): void {
        super.wear(player);
        if (this.type.length) {
            player.pickUpProp({
                container: null,
                foods: this.type.map((type, idx) => ({
                    type: type,
                    state: this._fsm[idx].State,
                })),
            });
        }

        // 更新绑定数据
        PropBindingMgr.instance.updateBindingDataByPropId(this.id, {
            foodId: null,
        });
    }

    public canWear(playerCarryingPropData: IPlayerCarryingPropData): boolean {
        return PropMgr.instance.can(
            [...this.data, ...playerCarryingPropData.foods],
            playerCarryingPropData.container || undefined
        );
    }

    /**
     * 处理切菜事件 / Handle chopping event
     */
    public onChop(): void {
        if (this.type.length === 0) {
            throw new Error('This food prop has no ingredient type defined.');
        }
        // 如果有多个食材则置之不理
        if (this.type.length > 1) {
            return;
        }

        console.log(
            `(FoodProp) ${this.id} onChop, current state: ${this._fsm[0].State}`
        );
        // 触发切菜事件
        this._fsm[0].send(FoodEvent.CHOP);
    }

    /**
     * 处理烹饪事件 / Handle cooking event
     * @param event 事件类型 / Event type
     */
    public onCook(event: FoodEvent = FoodEvent.COOK): void {
        if (this.type.length === 0) {
            throw new Error('This food prop has no ingredient type defined.');
        }
        // 如果有多个食材则置之不理
        if (this.type.length > 1) {
            return;
        }

        if (this._fsm[0].State === IngredientState.COOKED) {
            event = FoodEvent.BURNT;
        }

        this._fsm[0].send(event);

        console.log(
            `(FoodProp) ${this.id} onCook, current state: ${this._fsm[0].State}`
        );
    }

    /**
     * 处理烧糊事件 / Handle burnt event
     */
    public onBurnt(): void {}

    /**
     * 食物类型 / Food type
     */
    public get type(): IngredientType[] {
        return this._type;
    }

    /**
     * 食物数据 / Food data
     */
    public get data(): IPropData<IngredientType, IngredientState>[] {
        return this.type.map((type, idx) => ({
            type,
            state: this._fsm[idx].State,
        }));
    }

    /**
     * 所在容器 / container
     */
    public get container(): BaseContainerProp | null {
        const containerId = PropBindingMgr.instance.getBindingDataByPropId(
            this.id
        ).bindingData?.dynamicContainerId;
        return containerId
            ? (this.getInteractable(containerId) as BaseContainerProp)
            : null;
    }
}
