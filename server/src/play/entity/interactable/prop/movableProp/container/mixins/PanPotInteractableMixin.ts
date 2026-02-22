/* eslint-disable @typescript-eslint/no-explicit-any */
import type { InGamePlayer } from '../../../../../player/GamePlayer';
import type { BaseContainerProp } from '../../base/BaseContainerProp';
import { PropMgr } from '../../../../../../mgr/PropMgr';
import { ConfigMgr } from '../../../../../../mgr/ConfigMgr';

type Constructor<T> = new (...args: any[]) => T;
type AbstractConstructor<T> = abstract new (...args: any[]) => T;

/**
 * 锅具交互Mixin (Pot/Pan Interactable Mixin)
 * @param Base - 基类 / Base class
 * @returns 混入后的类 / Mixin class
 */
export function PanPotInteractableMixin<
    TBase extends AbstractConstructor<BaseContainerProp>,
>(Base: TBase): TBase {
    abstract class Mixin extends Base {
        protected onInteractCarryingContainerProp(player: InGamePlayer): void {
            if (this.food?.canWear(player.carryingProp)) {
                this.food.wear(player);
            }
        }

        protected onInteractCarryingFoodProp(player: InGamePlayer): void {
            const ingredients = [
                ...(this.food?.data || []),
                ...player.carryingProp.foods,
            ];
            const ingredientConfig = ConfigMgr.instance.getIngredientConfig(
                ingredients[0].type,
                ingredients[0].state
            );
            if (
                ingredients.length === 1 && // 仅一个食材
                ingredientConfig?.canBeCooked && // 可被烹饪
                ingredientConfig?.canPlateContainers.includes(this._type!) && // 可以放置的容器类型
                this.data && // 容器有数据
                ConfigMgr.instance.getContainerConfig(
                    this.data.type,
                    this.data.state
                )?.canHoldFood // 容器可容纳食物
            ) {
                if (this.entity) {
                    player.placeProp(this.entity?.position, this);
                }
            }
        }

        protected onInteractNotCarryingProp(player: InGamePlayer): void {
            if (
                PropMgr.instance.can(
                    [...(this.food?.data || []), ...player.carryingProp.foods],
                    this.data || undefined
                )
            ) {
                // 如果有绑定的食物/食材，那么也穿戴到玩家身上
                this.food?.wear(player);

                this.wear(player);
            }
        }
    }

    return Mixin;
}
