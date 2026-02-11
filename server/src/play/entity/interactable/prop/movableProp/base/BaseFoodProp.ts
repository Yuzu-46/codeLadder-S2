import type { MachineConfig } from '../../../../../../framework/common/state/FiniteStateMachine';
import { FiniteStateMachine } from '../../../../../../framework/common/state/FiniteStateMachine';
import type { IngredientType } from '../../../../../const/FoodConst';
import { FoodEvent } from '../../../../../const/FoodConst';
import { IngredientState } from '../../../../../const/FoodConst';
import type { IIngredientConfig } from '../../../../../data/InteractableData';
import { PlayerMgr } from '../../../../../mgr/PlayerMgr';
import { PropBindingMgr } from '../../../../../mgr/PropBindingMgr';
import type { InGamePlayer } from '../../../../player/GamePlayer';
import { BaseMovableProp } from './BaseMovableProp';

/**
 * 食材道具基类 / Base food prop
 */
export abstract class BaseFoodProp extends BaseMovableProp {
    protected _type: IngredientType[] = [];

    /**
     * 有限状态机 / Finite state machine
     */
    protected _fsm: FiniteStateMachine<IngredientState, FoodEvent>[] = [];

    private _machineConfig: MachineConfig<IngredientState, FoodEvent> = {
        initial: IngredientState.RAW,
        states: {
            [IngredientState.RAW]: {
                on: {
                    [FoodEvent.CHOP]: IngredientState.CHOPPED,
                },
            },
            [IngredientState.CHOPPED]: {
                on: {
                    [FoodEvent.COOK_START]: IngredientState.COOKING,
                },
            },
            [IngredientState.COOKING]: {
                on: {
                    [FoodEvent.COOK_END]: IngredientState.COOKED,
                },
            },
            [IngredientState.COOKED]: {
                on: {
                    [FoodEvent.BURNT]: IngredientState.BURNT,
                },
            },
            [IngredientState.BURNT]: {},
        },
    };

    public start(config: IIngredientConfig): void {
        super.start(config);
        this._type = config.type;
        this._fsm = config.state.map(
            (state) =>
                new FiniteStateMachine({
                    ...this._machineConfig,
                    initial: state,
                })
        );
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
        if (player.carryingProp.foods.length) {
            // 如果玩家拿着某道具
            // more...
        } else {
            this.wear(player);
        }
    }

    public wear(player: InGamePlayer): void {
        super.wear(player);
        if (this._type.length) {
            player.pickUpProp({
                container: null,
                foods: this._type.map((type, idx) => ({
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

    /**
     * 处理切菜事件 / Handle chopping event
     */
    public onChop(): void {
        if (this._type.length === 0) {
            throw new Error('This food prop has no ingredient type defined.');
        }
        // 如果有多个食材则置之不理
        if (this._type.length > 1) {
            return;
        }

        console.log(
            `(FoodProp) ${this.id} onChop, current state: ${this._fsm[0].State}`
        );
        // 触发切菜事件
        this._fsm[0].send(FoodEvent.CHOP);
    }
}
