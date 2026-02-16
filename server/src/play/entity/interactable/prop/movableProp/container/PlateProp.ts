import { FactoryToken } from '@src/framework/common/factory/AbstractFactory';
import { InteractableType } from '../../../../../const/TokenConst';
import type { IContainerPropConfig } from '../../../../../data/InteractableData';
import { BaseContainerProp } from '../base/BaseContainerProp';
import type { ContainerType } from '../../../../../const/ContainerConst';
import type { InGamePlayer } from '../../../../player/GamePlayer';

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
            this.canWear(player.carryingProp) &&
            ((this.food &&
                this.food.canWear({
                    ...player.carryingProp,
                    container: this.data,
                })) ||
                !this.food)
        ) {
            // 如果有绑定的食物/食材，那么也穿戴到玩家身上
            this.food?.wear(player);

            this.wear(player);
        }
    }

    protected onInteractNotCarryingProp(player: InGamePlayer): void {
        // 如果有绑定的食物/食材，那么也穿戴到玩家身上
        this.food?.wear(player);

        this.wear(player);
    }
}
