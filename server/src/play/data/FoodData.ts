import type { ContainerType } from '../const/ContainerConst';
import type {
    IngredientType,
    IngredientState,
    FoodType,
} from '../const/FoodConst';

/**
 * 食材状态配置数据接口 / Ingredient state configuration data interface
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
     * 可以装盘的容器类型 / Container types that can plate
     */
    canPlateContainers: ContainerType[];

    /**
     * 是否必须装盘 / Must be plated
     */
    mustBePlated: boolean;
}

/**
 * 食物配方配置接口 / Recipe configuration interface
 */
export interface IRecipeConfig {
    /**
     * 食材类型 / Food type
     */
    type: IngredientType;

    /**
     * 食材状态 / Food state
     */
    state: IngredientState;

    /**
     * 食材数量 / Food count
     */
    count: number;
}

/**
 * 食物/食材配置接口 / Food/Ingredient configuration interface
 */
export type IFoodConfig = {
    /**
     * 食材 / Ingredient
     */
    ingredient: Record<
        IngredientType,
        {
            /**
             * 各个状态的配置映射 / State configuration mapping
             */
            states: Partial<Record<IngredientState, IFoodStateConfig>>;
        }
    >;
    /**
     * 食物 / Food
     */
    food: Record<
        FoodType,
        {
            /**
             * 食物配方 / Food recipe
             */
            recipe: IRecipeConfig[];
        }
    >;
};
