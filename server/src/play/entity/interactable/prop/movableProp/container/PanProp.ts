import { FactoryToken } from '@src/framework/common/factory/AbstractFactory';
import { InteractableType } from '../../../../../const/TokenConst';
import type { IContainerPropConfig } from '../../../../../data/InteractableData';
import { BaseContainerProp } from '../base/BaseContainerProp';
import type { ContainerType } from '../../../../../const/ContainerConst';
import type { InGamePlayer } from '../../../../player/GamePlayer';
import { ConfigMgr } from '../../../../../mgr/ConfigMgr';

/**
 * 煎锅道具 / Pan prop
 */
@FactoryToken(InteractableType.PanProp)
export class PanProp extends BaseContainerProp {
    protected _type = 'pan' as ContainerType;

    public start(config: IContainerPropConfig): void {
        super.start(config);
        console.log('(Server) PanProp start with id ', config.id);
    }

    public onInteract(event: GameInteractEvent): void {
        super.onInteract(event);
    }

    public destroy(): void {
        super.destroy();
    }

    protected onInteractCarryingContainerProp(player: InGamePlayer): void {
        if (this.food?.canWear(player.carryingProp)) {
            this.food.wear(player);
        }
    }

    protected onInteractCarryingFoodProp(player: InGamePlayer): void {
        // 如果不能容纳食物直接忽略
        if (
            !this._fsm ||
            !ConfigMgr.instance.getContainerConfig(this._type, this._fsm.State)
                ?.canHoldFood
        ) {
            return;
        }

        // 判断是否可以烹饪
        const ingredients = [
            ...(this.food?.data || []),
            ...player.carryingProp.foods,
        ];
        if (
            ingredients.length === 1 &&
            !ConfigMgr.instance.getIngredientConfig(
                ingredients[0].type,
                ingredients[0].state
            )?.canBeCooked
        ) {
            return;
        }

        // 检测食物是否可以放置
        if (this.food && !this.food.canWear(player.carryingProp)) {
            // 这里使用canWear方法判断是因为逻辑一致
            return;
        }

        if (this.entity) {
            player.placeProp(this.entity?.position, this);
        }
    }
}
