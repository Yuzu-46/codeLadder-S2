import { Interactable } from '../../../base/Interactable';
import type { IInteractableData } from '../../../../../data/InteractableData';
import type { InGamePlayer } from '../../../../player/GamePlayer';
import type { ContainerType } from '../../../../../const/ContainerConst';
import type { IngredientType } from '../../../../../const/FoodConst';
import { InteractableMgr } from '../../../../../mgr/InteractableMgr';

/**
 * 可移动道具基类 / Movable prop base class
 */
export abstract class BaseMovableProp extends Interactable {
    /**
     * 道具类型 / Prop type
     */
    protected _type: ContainerType | IngredientType[] | null = null;

    public start(config: IInteractableData): void {
        super.start(config);
    }

    /**
     * 穿戴到玩家上 / Wear on player
     * @param player 玩家对象 / Player object
     */
    public wear(player: InGamePlayer): void {
        // 销毁道具
        InteractableMgr.instance.destroyInteractable(this.id);
    }
}
