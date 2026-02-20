/**
 * 食材类型 / Ingredient type
 */
export type IngredientType = 'bread' | 'meat' | 'vegetable' | 'tomato';

/**
 * 食物类型 / Food type
 */
export type FoodType =
    | 'meatBurger'
    | 'mixedBurger'
    | 'nutritiousBurger'
    | 'beefSoup';

/**
 * 食材状态 / Ingredient state
 */
export const enum IngredientState {
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
     * 切
     */
    CHOP = 'chop',
    /**
     * 烹饪
     */
    COOK = 'cook',
    /**
     * 烹饪完成
     */
    COOK_FINISH = 'cook_finish',
    /**
     * 糊
     */
    BURNT = 'burnt',
}
