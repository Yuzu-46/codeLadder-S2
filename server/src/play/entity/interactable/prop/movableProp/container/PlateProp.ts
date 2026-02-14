import { FactoryToken } from '@src/framework/common/factory/AbstractFactory';
import { InteractableType } from '../../../../../const/TokenConst';
import type { IContainerPropConfig } from '../../../../../data/InteractableData';
import { BaseContainerProp } from '../base/BaseContainerProp';
import type { ContainerType } from '../../../../../const/ContainerConst';
import type { InGamePlayer } from '../../../../player/GamePlayer';
import { PropMgr } from '../../../../../mgr/PropMgr';

/**
 * 盘子道具 / Plate prop
 */
@FactoryToken(InteractableType.PlateProp)
export class PlateProp extends BaseContainerProp {
    protected _type = 'plate' as ContainerType;

    public start(config: IContainerPropConfig): void {
        super.start(config);
        console.log('(Server) PlateProp start with id ', config.id);
    }

    public onInteract(event: GameInteractEvent): void {
        super.onInteract(event);
    }

    public destroy(): void {
        super.destroy();
    }

    protected onInteractCarryingFoodProp(player: InGamePlayer): void {
        // 此时玩家不携带容器道具且携带食物道具
        if (
            this.food &&
            PropMgr.instance.findCreatableRecipe([
                ...this.food.foodData,
                ...player.carryingProp.foods,
            ])
        ) {
            // 如果盘子上有食物，并且玩家携带的食物可以和盘子上的食物组合成菜谱，那么就把玩家携带的食物放到盘子上
            this.wear(player);
        } else if (!this.food) {
            // 如果盘子上没有食物，则无需考虑直接穿戴到玩家
            this.wear(player);
        }
    }
}
