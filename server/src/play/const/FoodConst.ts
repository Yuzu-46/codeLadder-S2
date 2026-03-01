/**
 * 食材类型 / Ingredient type
 */
export type IngredientType =
    | 'bread' // 面包
    | 'meat' // 肉
    | 'vegetable' // 蔬菜
    | 'tomato'; // 番茄

/**
 * 食物类型 / Food type
 */
export type FoodType =
    | 'meatBurger' // 荤汉堡
    | 'vegetableBurger' // 素汉堡（面包+蔬菜）
    | 'tomatoBurger' // 番茄汉堡（面包+番茄）
    | 'mixedBurger' // 荤素汉堡
    | 'vegetableTomatoBurger' // 蔬菜番茄汉堡（面包+蔬菜+番茄）
    | 'nutritiousBurger' // 营养汉堡
    | 'beefSoup'; // 牛肉汤

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
    /**
     * 直接糊
     */
    BURNT_DIRECTLY = 'burnt_directly',
}
