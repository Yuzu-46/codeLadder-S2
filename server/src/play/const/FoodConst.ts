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

/**
 * 食物/食材事件 / Food/Ingredient event
 */
export const enum FoodEvent {
    /**
     * 切完
     */
    CHOPPED = 'chopped',
    /**
     * 开始烹饪
     */
    COOK_START = 'cook_start',
    /**
     * 烹饪完成
     */
    COOK_END = 'cook_end',
    /**
     * 糊
     */
    BURNT = 'burnt',
}
