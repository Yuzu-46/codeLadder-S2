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
    RAW = 'raw',
    /**
     * 已切
     */
    CHOPPED = 'chopped',
    /**
     * 烹饪中
     */
    COOKING = 'cooking',
    /**
     * 熟
     */
    COOKED = 'cooked',
    /**
     * 糊
     */
    BURNT = 'burnt',
}
