/**
 * 食物/食材类型 / Food/Ingredient type
 */
export type FoodType = 'bread' | 'meat' | 'vegetable' | 'tomato';

/**
 * 食材状态 / Ingredient state
 */
export const enum FoodState {
    /**
     * 生
     */
    RAW = 0,
    /**
     * 已切
     */
    CHOPPED = 1,
    /**
     * 烹饪中
     */
    COOKING = 2,
    /**
     * 熟
     */
    COOKED = 3,
    /**
     * 糊
     */
    BURNT = 4,
}
