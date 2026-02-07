import { BaseMovableProp } from './BaseMovableProp';
import type { ContainerType } from '../../../../../const/ContainerConst';
import {
    ContainerState,
    ContainerEvent,
} from '../../../../../const/ContainerConst';
import type { IInteractableData } from '../../../../../data/InteractableData';
import { PlayerMgr } from '../../../../../mgr/PlayerMgr';
import type { InGamePlayer } from '../../../../player/GamePlayer';
import { InteractableMgr } from '../../../../../mgr/InteractableMgr';
import type { BaseImmovableProp } from '../../immovableProp/BaseImmovableProp';
import type { MachineConfig } from '../../../../../../framework/common/state/FiniteStateMachine';
import { FiniteStateMachine } from '../../../../../../framework/common/state/FiniteStateMachine';

/**
 * 容器道具基类 / Container prop base class
 */
export abstract class BaseContainerProp extends BaseMovableProp {
    protected _type: ContainerType | null = null;

    /**
     * 食材道具ID / Food prop ID
     */
    private _foodsId: string | null = null;

    /**
     * 有限状态机 / Finite state machine
     */
    private _fsm: FiniteStateMachine<ContainerState, ContainerEvent>;

    constructor() {
        super();
        const config: MachineConfig<ContainerState, ContainerEvent> = {
            initial: ContainerState.CLEAN,
            states: {
                [ContainerState.CLEAN]: {
                    on: {
                        [ContainerEvent.POLLUTE]: ContainerState.DIRTY,
                    },
                },
                [ContainerState.DIRTY]: {
                    on: {
                        [ContainerEvent.CLEAN]: ContainerState.CLEAN,
                    },
                },
            },
        };
        this._fsm = new FiniteStateMachine(config);
    }

    public start(config: IInteractableData): void {
        super.start(config);
    }

    public async onInteract(event: GameInteractEvent): Promise<void> {
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
            // more...
        } else {
            this.foods?.wear(player);
            this.wear(player);
        }
    }

    public destroy(): void {
        super.destroy();
        const { container } = this;
        if (container) {
            container.removePlacedProp();
        }
        this.leaveContainer();
    }

    /**
     * 食材道具 / Food prop
     */
    public get foods(): BaseMovableProp | null {
        return this.getInteractable(this._foodsId) as BaseMovableProp | null;
    }

    /**
     * 放置食材 / Place food
     * @param foodsId 食材道具ID / Food prop ID
     */
    public placeFoods(foodsId: string): void {
        this._foodsId = foodsId;
    }

    /**
     * 移除食材 / Remove food
     */
    public removeFoods(): void {
        this._foodsId = null;
    }

    public get container(): BaseImmovableProp | null {
        return super.container as BaseImmovableProp | null;
    }

    public placeToContainer(containerId: string): void {
        super.placeToContainer(containerId);
        this.container?.placeProp(this.id);
    }

    public wear(player: InGamePlayer) {
        super.wear(player);
        if (this._type) {
            player.pickUpProp({
                container: {
                    type: this._type,
                    state: this._fsm.State,
                },
                foods: [],
            });
        }
        if (this.foods) {
            this.foods.wear(player);
        }
    }
}
