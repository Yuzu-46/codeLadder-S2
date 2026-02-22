import type { IFoodConfig } from '../../data/FoodData';
import { IngredientState } from '../../const/FoodConst';

/**
 * 食物配置 / Food configuration
 */
export const FoodConfig: IFoodConfig = {
    ingredient: {
        bread: {
            states: {
                [IngredientState.RAW]: {
                    canBeCut: false,
                    canBeCooked: false,
                    canPlateContainers: ['plate'],
                    mustBePlated: false,
                },
            },
        },
        meat: {
            states: {
                [IngredientState.RAW]: {
                    canBeCut: true,
                    canBeCooked: false,
                    canPlateContainers: [],
                    mustBePlated: false,
                },
                [IngredientState.CHOPPED]: {
                    canBeCut: false,
                    canBeCooked: true,
                    canPlateContainers: ['pan', 'pot'],
                    mustBePlated: false,
                },
                [IngredientState.COOKING]: {
                    canBeCut: false,
                    canBeCooked: false,
                    canPlateContainers: [],
                    mustBePlated: false,
                },
                [IngredientState.COOKED]: {
                    canBeCut: false,
                    canBeCooked: false,
                    canPlateContainers: ['plate', 'pan', 'pot'],
                    mustBePlated: true,
                },
                [IngredientState.BURNT]: {
                    canBeCut: false,
                    canBeCooked: false,
                    canPlateContainers: ['pan', 'pot'],
                    mustBePlated: false,
                },
            },
        },
        vegetable: {
            states: {
                [IngredientState.RAW]: {
                    canBeCut: true,
                    canBeCooked: false,
                    canPlateContainers: [],
                    mustBePlated: false,
                },
                [IngredientState.CHOPPED]: {
                    canBeCut: false,
                    canBeCooked: true,
                    canPlateContainers: ['pan', 'pot'],
                    mustBePlated: false,
                },
                [IngredientState.COOKING]: {
                    canBeCut: false,
                    canBeCooked: false,
                    canPlateContainers: [],
                    mustBePlated: false,
                },
                [IngredientState.COOKED]: {
                    canBeCut: false,
                    canBeCooked: false,
                    canPlateContainers: ['plate', 'pan', 'pot'],
                    mustBePlated: false,
                },
                [IngredientState.BURNT]: {
                    canBeCut: false,
                    canBeCooked: false,
                    canPlateContainers: ['pan', 'pot'],
                    mustBePlated: false,
                },
            },
        },
        tomato: {
            states: {
                [IngredientState.RAW]: {
                    canBeCut: true,
                    canBeCooked: false,
                    canPlateContainers: [],
                    mustBePlated: false,
                },
                [IngredientState.CHOPPED]: {
                    canBeCut: false,
                    canBeCooked: true,
                    canPlateContainers: ['pan', 'pot'],
                    mustBePlated: false,
                },
                [IngredientState.COOKING]: {
                    canBeCut: false,
                    canBeCooked: false,
                    canPlateContainers: [],
                    mustBePlated: false,
                },
                [IngredientState.COOKED]: {
                    canBeCut: false,
                    canBeCooked: false,
                    canPlateContainers: ['plate', 'pan', 'pot'],
                    mustBePlated: false,
                },
                [IngredientState.BURNT]: {
                    canBeCut: false,
                    canBeCooked: false,
                    canPlateContainers: ['pan', 'pot'],
                    mustBePlated: false,
                },
            },
        },
    },
    food: {
        meatBurger: {
            recipe: [
                {
                    type: 'bread',
                    state: IngredientState.RAW,
                    count: 1,
                },
                {
                    type: 'meat',
                    state: IngredientState.COOKED,
                    count: 1,
                },
            ],
        },
        mixedBurger: {
            recipe: [
                {
                    type: 'bread',
                    state: IngredientState.RAW,
                    count: 1,
                },
                {
                    type: 'meat',
                    state: IngredientState.COOKED,
                    count: 1,
                },
                {
                    type: 'vegetable',
                    state: IngredientState.COOKED,
                    count: 1,
                },
            ],
        },
        nutritiousBurger: {
            recipe: [
                {
                    type: 'bread',
                    state: IngredientState.RAW,
                    count: 1,
                },
                {
                    type: 'meat',
                    state: IngredientState.COOKED,
                    count: 1,
                },
                {
                    type: 'vegetable',
                    state: IngredientState.COOKED,
                    count: 1,
                },
                {
                    type: 'tomato',
                    state: IngredientState.COOKED,
                    count: 1,
                },
            ],
        },
        beefSoup: {
            recipe: [
                {
                    type: 'meat',
                    state: IngredientState.COOKED,
                    count: 1,
                },
            ],
        },
    },
};
