import { Interactable } from '../../../base/Interactable';
import type { IInteractableData } from '../../../../../data/InteractableData';
import { MovablePropConfig } from '../../../../../config/MovablePropConfig';
import type { InGamePlayer } from '../../../../player/GamePlayer';
import type { ContainerType } from '../../../../../const/ContainerConst';
import type { FoodType } from '../../../../../const/FoodConst';
import { InteractableMgr } from '../../../../../mgr/InteractableMgr';

/**
 * 可移动道具基类 / Movable prop base class
 */
export abstract class BaseMovableProp extends Interactable {
    /**
     * 道具类型 / Prop type
     */
    protected _type: ContainerType | FoodType[] | null = null;

    /**
     * 所在容器ID / Container ID
     */
    protected _containerId: string | null = null;

    public start(config: IInteractableData): void {
        super.start(config);
    }

    /**
     * 所在容器 / Container
     */
    public get container(): Interactable | null {
        return this.getInteractable(this._containerId);
    }

    /**
     * 放置到容器中 / Place to container
     * @param containerId 容器ID / Container ID
     */
    public placeToContainer(containerId: string): void {
        if (this._containerId) {
            throw new Error('Prop already placed');
        }
        this._containerId = containerId;
    }

    /**
     * 离开容器 / Leave container
     */
    public leaveContainer(): void {
        this._containerId = null;
    }

    /**
     * 穿戴到玩家上 / Wear on player
     * @param player 玩家对象 / Player object
     */
    public wear(player: InGamePlayer): void {}
}
