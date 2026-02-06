import type { IngredientType, FoodState } from '../const/FoodConst';

/**
 * 食物/食材状态配置数据接口 / Food/Ingredient state configuration data interface
 */
export interface IFoodStateConfig {
    /**
     * 是否可以被切割 / Can be cut
     */
    canBeCut: boolean;

    /**
     * 是否可以被烹饪 / Can be cooked
     */
    canBeCooked: boolean;

    /**
     * 是否可以被装盘 / Can be plated
     */
    canBePlated: boolean;

    /**
     * 是否必须装盘 / Must be plated
     */
    mustBePlated: boolean;

    /**
     * 当前状态下的模型资源 / Model resource under current state
     */
    mesh: GameModelAssets;
}

/**
 * 食物/食材配置接口 / Food/Ingredient configuration interface
 */
export type IFoodConfig = Record<
    IngredientType,
    {
        /**
         * 各个状态的配置映射 / State configuration mapping
         */
        states: Record<FoodState, IFoodStateConfig>;
    }
>;
