import type { IFoodConfig } from '../../data/FoodData';
import { IngredientState } from '../../const/FoodConst';

export const FoodConfig: IFoodConfig = {
    ingredient: {
        bread: {
            states: {
                [IngredientState.RAW]: {
                    canBeCut: true,
                    canBeCooked: true,
                    canBePlated: true,
                    mustBePlated: false,
                    mesh: 'mesh/面包.vb',
                },
                [IngredientState.CHOPPED]: {
                    canBeCut: false,
                    canBeCooked: true,
                    canBePlated: true,
                    mustBePlated: false,
                    mesh: 'mesh/面包.vb',
                },
                [IngredientState.COOKING]: {
                    canBeCut: false,
                    canBeCooked: false,
                    canBePlated: false,
                    mustBePlated: false,
                    mesh: 'mesh/面包.vb',
                },
                [IngredientState.COOKED]: {
                    canBeCut: false,
                    canBeCooked: false,
                    canBePlated: true,
                    mustBePlated: false,
                    mesh: 'mesh/面包.vb',
                },
                [IngredientState.BURNT]: {
                    canBeCut: false,
                    canBeCooked: false,
                    canBePlated: false,
                    mustBePlated: false,
                    mesh: 'mesh/面包.vb',
                },
            },
        },
        meat: {
            states: {
                [IngredientState.RAW]: {
                    canBeCut: true,
                    canBeCooked: false,
                    canBePlated: false,
                    mustBePlated: false,
                    mesh: 'mesh/牛肉.vb',
                },
                [IngredientState.CHOPPED]: {
                    canBeCut: false,
                    canBeCooked: true,
                    canBePlated: false,
                    mustBePlated: false,
                    mesh: 'mesh/牛肉.vb',
                },
                [IngredientState.COOKING]: {
                    canBeCut: false,
                    canBeCooked: false,
                    canBePlated: false,
                    mustBePlated: false,
                    mesh: 'mesh/牛肉.vb',
                },
                [IngredientState.COOKED]: {
                    canBeCut: false,
                    canBeCooked: false,
                    canBePlated: true,
                    mustBePlated: true,
                    mesh: 'mesh/牛肉.vb',
                },
                [IngredientState.BURNT]: {
                    canBeCut: false,
                    canBeCooked: false,
                    canBePlated: false,
                    mustBePlated: false,
                    mesh: 'mesh/牛肉.vb',
                },
            },
        },
        vegetable: {
            states: {
                [IngredientState.RAW]: {
                    canBeCut: true,
                    canBeCooked: false,
                    canBePlated: false,
                    mustBePlated: false,
                    mesh: 'mesh/蔬菜.vb',
                },
                [IngredientState.CHOPPED]: {
                    canBeCut: false,
                    canBeCooked: true,
                    canBePlated: false,
                    mustBePlated: false,
                    mesh: 'mesh/蔬菜.vb',
                },
                [IngredientState.COOKING]: {
                    canBeCut: false,
                    canBeCooked: false,
                    canBePlated: false,
                    mustBePlated: false,
                    mesh: 'mesh/蔬菜.vb',
                },
                [IngredientState.COOKED]: {
                    canBeCut: false,
                    canBeCooked: false,
                    canBePlated: true,
                    mustBePlated: false,
                    mesh: 'mesh/蔬菜.vb',
                },
                [IngredientState.BURNT]: {
                    canBeCut: false,
                    canBeCooked: false,
                    canBePlated: false,
                    mustBePlated: false,
                    mesh: 'mesh/蔬菜.vb',
                },
            },
        },
        tomato: {
            states: {
                [IngredientState.RAW]: {
                    canBeCut: true,
                    canBeCooked: false,
                    canBePlated: false,
                    mustBePlated: false,
                    mesh: 'mesh/番茄.vb',
                },
                [IngredientState.CHOPPED]: {
                    canBeCut: false,
                    canBeCooked: true,
                    canBePlated: false,
                    mustBePlated: false,
                    mesh: 'mesh/番茄.vb',
                },
                [IngredientState.COOKING]: {
                    canBeCut: false,
                    canBeCooked: false,
                    canBePlated: false,
                    mustBePlated: false,
                    mesh: 'mesh/番茄.vb',
                },
                [IngredientState.COOKED]: {
                    canBeCut: false,
                    canBeCooked: false,
                    canBePlated: true,
                    mustBePlated: false,
                    mesh: 'mesh/番茄.vb',
                },
                [IngredientState.BURNT]: {
                    canBeCut: false,
                    canBeCooked: false,
                    canBePlated: false,
                    mustBePlated: false,
                    mesh: 'mesh/番茄.vb',
                },
            },
        },
    },
    recipe: {
        meatBurger: [
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
        mixedBurger: [
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
        nutritiousBurger: [
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
        beefSoup: [
            {
                type: 'meat',
                state: IngredientState.COOKED,
                count: 1,
            },
        ],
    },
};
