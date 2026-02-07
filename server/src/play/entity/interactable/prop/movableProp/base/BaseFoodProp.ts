import type { MachineConfig } from '../../../../../../framework/common/state/FiniteStateMachine';
import { FiniteStateMachine } from '../../../../../../framework/common/state/FiniteStateMachine';
import type { IngredientType } from '../../../../../const/FoodConst';
import { FoodEvent } from '../../../../../const/FoodConst';
import { IngredientState } from '../../../../../const/FoodConst';
import { IFoodConfig } from '../../../../../data/FoodData';
import type { IIngredientConfig } from '../../../../../data/InteractableData';
import { IInteractableData } from '../../../../../data/InteractableData';
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
                    [FoodEvent.CHOPPED]: IngredientState.CHOPPED,
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

    public wear(player: InGamePlayer): void {
        super.wear(player);
        if (this._type.length) {
            console.log('(Server) BaseFoodProp wear');
            player.pickUpProp({
                container: null,
                foods: this._type.map((type, idx) => ({
                    type: type,
                    state: this._fsm[idx].State,
                })),
            });
        }
    }
}
