import { Singleton } from '../../framework/common/Singleton';
import { ConfigMgr } from './ConfigMgr';
import type {
    FoodType,
    IngredientState,
    IngredientType,
} from '../const/FoodConst';
import type { IRecipeConfig } from '../data/FoodData';
import type {
    IPropData,
    IPlayerCarryingPropData,
} from '../data/GamePlayerData';
import type {
    IContainerPropConfig,
    IIngredientConfig,
} from '../data/InteractableData';
import type { IMovablePropData } from '../data/MovablePropData';
import type { BaseContainerProp } from '../entity/interactable/prop/movableProp/base/BaseContainerProp';
import type { BaseFoodProp } from '../entity/interactable/prop/movableProp/base/BaseFoodProp';
import { InteractableMgr } from './InteractableMgr';
import { PropBindingMgr } from './PropBindingMgr';
import { FoodConfig } from '../config/FoodConfig';
import type { Interactable } from '../entity/interactable/base/Interactable';

/**
 * 道具管理器 / Prop manager
 */
export class PropMgr extends Singleton<PropMgr>() {
    /**
     * 配置管理器 / Config manager
     */
    private _configMgr = ConfigMgr.instance;
    /**
     * 在指定位置放置道具 / Place a prop at the specified position
     * @param position 位置 / Position
     */
    public async placeProp(
        playerPropData: IPlayerCarryingPropData,
        position: GameVector3,
        interactable?: Interactable
    ): Promise<void> {
        let container: BaseContainerProp | null = null;
        if (playerPropData.container) {
            const containerData = playerPropData.container;
            const config = this._configMgr.getMovablePropConfig(
                containerData.type
            )!;
            // 这里不再获取mesh 和 interactHint 了，因为容器基类会根据状态自行切换
            container = InteractableMgr.instance.createInteractable({
                ...config.interactableConfig,
                entityConfig: {
                    position,
                    ...config.interactableConfig.entityConfig,
                },
                state: containerData.state,
            } as IContainerPropConfig) as BaseContainerProp;
            if (interactable) {
                PropBindingMgr.instance.updateBindingDataByPropId(
                    interactable.id,
                    { dynamicContainerId: container.id }
                );
            }
        }

        if (playerPropData.foods.length) {
            const foodData = playerPropData.foods;
            let config: IMovablePropData | null = null;
            // 这里不再获取mesh 和 interactHint 了，因为食物基类会根据状态自行切换
            const createdFood = this.findCreatableRecipe(foodData);
            if (createdFood) {
                config = this._configMgr.getMovablePropConfig(createdFood)!;
            } else {
                config = this._configMgr.getMovablePropConfig(
                    foodData[0].type
                )!;
            }
            const foods = InteractableMgr.instance.createInteractable({
                ...config.interactableConfig,
                entityConfig: {
                    position,
                    ...config.interactableConfig.entityConfig,
                },
                type: foodData.map((food) => food.type),
                state: foodData.map((food) => food.state),
            } as IIngredientConfig) as BaseFoodProp;
            if (interactable) {
                PropBindingMgr.instance.updateBindingDataByPropId(
                    interactable.id,
                    {
                        foodId: foods.id,
                    }
                );
            }
        }
    }

    /**
     * 查找可以合成的配方 / Find creatable recipe
     * @returns 可以合成的食物类型，如果没有则返回null / Creatable food type, or null if none
     */
    public findCreatableRecipe(
        ingredients: IPropData<IngredientType, IngredientState>[]
    ): FoodType | null {
        // 遍历所有配方
        for (const [foodType, { recipe }] of Object.entries(FoodConfig.food)) {
            //TODO: 优化
            if (this.canCreateRecipe(recipe, ingredients)) {
                return foodType as FoodType;
            }
        }

        return null;
    }

    /**
     * 检查是否可以创建指定配方 / Check if specified recipe can be created
     * @param recipe 配方配置 / Recipe configuration
     * @param ingredients 携带的食材数据 / Carrying food data
     * @returns 是否可以创建 / Whether it can be created
     */
    public canCreateRecipe(
        recipe: IRecipeConfig[],
        ingredients: IPropData<IngredientType, IngredientState>[]
    ): boolean {
        // 创建食材需求统计
        const requiredIngredients = new Map<string, number>();

        // 统计配方所需的各种食材及其数量和状态
        recipe.forEach((ingredient) => {
            const key = `${ingredient.type}_${ingredient.state}`;
            requiredIngredients.set(
                key,
                (requiredIngredients.get(key) || 0) + ingredient.count
            );
        });

        // 用玩家携带的食材数据减去配方所需的食材数据
        for (const food of ingredients) {
            const key = `${food.type}_${food.state}`;
            const currentRequiredCount =
                (requiredIngredients.get(key) || 0) - 1;
            if (currentRequiredCount < 0) {
                return false;
            }
            requiredIngredients.set(key, currentRequiredCount);
        }

        // 检查是否满足所有需求
        for (const [key, count] of requiredIngredients) {
            if (count > 0 || count < 0) {
                return false;
            }
        }

        return true;
    }
}
