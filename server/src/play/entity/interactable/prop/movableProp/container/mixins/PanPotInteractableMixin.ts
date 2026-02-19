/* eslint-disable @typescript-eslint/no-explicit-any */
import type { InGamePlayer } from '../../../../../player/GamePlayer';
import { ConfigMgr } from '../../../../../../mgr/ConfigMgr';
import type { BaseContainerProp } from '../../base/BaseContainerProp';

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
            // 如果不能容纳食物直接忽略
            if (
                !this._fsm ||
                !ConfigMgr.instance.getContainerConfig(
                    this._type!,
                    this._fsm.State
                )?.canHoldFood
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

        protected onInteractNotCarryingProp(player: InGamePlayer): void {
            if (this.food?.canWear(player.carryingProp) || !this.food) {
                // 如果有绑定的食物/食材，那么也穿戴到玩家身上
                this.food?.wear(player);

                this.wear(player);
            }
        }
    }

    return Mixin;
}
