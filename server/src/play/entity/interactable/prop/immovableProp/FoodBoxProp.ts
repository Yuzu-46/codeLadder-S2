import { BaseImmovableProp } from './BaseImmovableProp';
import { FactoryToken } from '@src/framework/common/factory/AbstractFactory';
import { InteractableType } from '../../../../const/TokenConst';
import type {
    IFoodBoxPropConfig,
    IInteractableData,
} from '../../../../data/InteractableData';
import { PlayerMgr } from '../../../../mgr/PlayerMgr';
import { InGamePlayer } from '../../../player/GamePlayer';
import {
    IngredientState,
    type IngredientType,
} from '../../../../const/FoodConst';

/**
 * 无限食材箱 / Food Box Prop
 */
@FactoryToken(InteractableType.FoodBoxProp)
export class FoodBoxProp extends BaseImmovableProp {
    /**
     * 食材类型 / Food type
     */
    public type: IngredientType | null = null;

    public start(config: IFoodBoxPropConfig): void {
        super.start(config);
        this.type = config.foodType;
        console.log('(Server) FoodBoxProp start with id ', config.id);
    }

    public async onInteract(event: GameInteractEvent): Promise<void> {
        super.onInteract(event);
        const player = PlayerMgr.instance.getPlayer(event.entity.player.userId);
        if (player && player instanceof InGamePlayer && this.type) {
            player.pickUpProp({
                container: null,
                foods: [
                    {
                        type: this.type,
                        state: IngredientState.RAW,
                    },
                ],
            });
        }
    }
}
