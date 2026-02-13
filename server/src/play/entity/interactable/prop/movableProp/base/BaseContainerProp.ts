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

/**
 * 容器道具基类 / Container prop base class
 */
export abstract class BaseContainerProp extends BaseMovableProp {
    protected _type: ContainerType | null = null;

    /**
     * 有限状态机 / Finite state machine
     */
    private _fsm: FiniteStateMachine<ContainerState, ContainerEvent> | null =
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
            // 如果玩家拿着某道具
            this.onInteractCarryingContainerProp(player);
        } else if (player.carryingProp.foods.length) {
            // 如果玩家拿着食物
            // TODO: 处理把食物放到容器里的逻辑
        } else {
            this.wear(player);
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
    private onInteractCarryingContainerProp(player: InGamePlayer): void {}

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

        // 如果有绑定的食物/食材，那么也穿戴到玩家身上
        this.food?.wear(player);
        // 更新绑定数据
        PropBindingMgr.instance.updateBindingDataByPropId(this.id, {
            dynamicContainerId: null,
        });
    }

    /**
     * 该容器中的食物 / food
     */
    private get food(): BaseMovableProp | undefined {
        const foodId = PropBindingMgr.instance.getBindingDataByPropId(this.id)
            .bindingData?.foodId;
        if (foodId) {
            return this.getInteractable(foodId) as BaseMovableProp;
        }
    }
}
