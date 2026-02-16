import { BaseMovableProp } from './BaseMovableProp';
import type { ContainerType } from '../../../../../const/ContainerConst';
import {
    ContainerState,
    ContainerEvent,
} from '../../../../../const/ContainerConst';
import type { IContainerPropConfig } from '../../../../../data/InteractableData';
import { PlayerMgr } from '../../../../../mgr/PlayerMgr';
import type { InGamePlayer } from '../../../../player/GamePlayer';
import type { MachineConfig } from '../../../../../../framework/common/state/FiniteStateMachine';
import { FiniteStateMachine } from '../../../../../../framework/common/state/FiniteStateMachine';
import { PropBindingMgr } from '../../../../../mgr/PropBindingMgr';
import { MovablePropConfig } from '../../../../../config/MovablePropConfig';
import type { BaseFoodProp } from './BaseFoodProp';
import type {
    IPlayerCarryingPropData,
    IPropData,
} from '../../../../../data/GamePlayerData';

/**
 * 容器道具基类 / Container prop base class
 */
export abstract class BaseContainerProp extends BaseMovableProp {
    protected _type: ContainerType | null = null;

    /**
     * 有限状态机 / Finite state machine
     */
    protected _fsm: FiniteStateMachine<ContainerState, ContainerEvent> | null =
        null;

    private _machineConfig: MachineConfig<ContainerState, ContainerEvent> = {
        initial: ContainerState.CLEAN,
        states: {
            [ContainerState.CLEAN]: {
                on: {
                    [ContainerEvent.POLLUTE]: ContainerState.DIRTY,
                },
                onEnter: () => {
                    this.onEnterState(ContainerState.CLEAN);
                },
            },
            [ContainerState.DIRTY]: {
                on: {
                    [ContainerEvent.CLEAN]: ContainerState.CLEAN,
                },
                onEnter: () => {
                    this.onEnterState(ContainerState.DIRTY);
                },
            },
        },
    };
    constructor() {
        super();
    }

    public start(config: IContainerPropConfig): void {
        super.start(config);
        this._fsm = new FiniteStateMachine({
            ...this._machineConfig,
            initial: config.state,
        });
        if (config.bindStaticContainerId) {
            // 如果有绑定的静态容器，那么把自己绑定到那个静态容器上
            PropBindingMgr.instance.updateBindingDataByPropId(
                config.bindStaticContainerId,
                {
                    dynamicContainerId: this.id,
                }
            );
        }
    }

    public onInteract(event: GameInteractEvent): void {
        super.onInteract(event);
        if (!this._type) {
            throw new Error('PlateProp: type is null');
        }

        const { entity } = event;
        const player = PlayerMgr.instance.getPlayer(
            entity.player.userId
        ) as InGamePlayer;
        if (player.carryingProp.container) {
            // 如果玩家拿着容器道具
            this.onInteractCarryingContainerProp(player);
        } else if (player.carryingProp.foods.length) {
            // 如果玩家拿着食物
            this.onInteractCarryingFoodProp(player);
        } else {
            // 如果玩家没有拿着任何道具
            this.onInteractNotCarryingProp(player);
        }
    }

    /**
     * 进入状态时的处理逻辑 / Logic to handle when entering a state
     * @param state 当前状态 / Current state
     */
    private onEnterState(state: ContainerState): void {
        // 根据状态切换模型等表现
        if (this.entity && this._type) {
            const { mesh, interactHint } =
                MovablePropConfig.data[this._type].states[state] || {};
            if (mesh) {
                this.entity.mesh = mesh;
            }
            if (interactHint) {
                this.entity.interactHint = interactHint;
            }
        }
    }

    /**
     * 处理玩家携带容器道具的交互事件 / Handle player carrying container prop interaction event
     */
    protected onInteractCarryingContainerProp(player: InGamePlayer): void {}

    /**
     * 处理玩家携带食物道具的交互事件 / Handle player carrying food prop interaction event
     */
    protected onInteractCarryingFoodProp(player: InGamePlayer): void {}

    /**
     * 处理玩家不携带道具的交互事件 / Handle player not carrying prop interaction event
     */
    protected onInteractNotCarryingProp(player: InGamePlayer): void {}

    public destroy(): void {
        super.destroy();
    }

    public wear(player: InGamePlayer) {
        super.wear(player);
        if (this._type) {
            player.pickUpProp({
                container: {
                    type: this._type,
                    state: this._fsm?.State || ContainerState.CLEAN,
                },
                foods: [],
            });
        }

        // 更新绑定数据
        PropBindingMgr.instance.updateBindingDataByPropId(this.id, {
            dynamicContainerId: null,
        });
    }

    public canWear(playerCarryingPropData: IPlayerCarryingPropData): boolean {
        return super.canWear(playerCarryingPropData);
    }

    /**
     * 该容器中的食物 / food
     */
    protected get food(): BaseFoodProp | undefined {
        const foodId = PropBindingMgr.instance.getBindingDataByPropId(this.id)
            .bindingData?.foodId;
        if (foodId) {
            return this.getInteractable(foodId) as BaseFoodProp;
        }
    }

    /**
     * 容器数据 / container data
     */
    public get data(): IPropData<ContainerType, ContainerState> | null {
        return this._type && this._fsm
            ? {
                  type: this._type,
                  state: this._fsm.State,
              }
            : null;
    }
}
