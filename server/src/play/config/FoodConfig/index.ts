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
                },
                [IngredientState.CHOPPED]: {
                    canBeCut: false,
                    canBeCooked: true,
                    canBePlated: true,
                    mustBePlated: false,
                },
                [IngredientState.COOKING]: {
                    canBeCut: false,
                    canBeCooked: false,
                    canBePlated: false,
                    mustBePlated: false,
                },
                [IngredientState.COOKED]: {
                    canBeCut: false,
                    canBeCooked: false,
                    canBePlated: true,
                    mustBePlated: false,
                },
                [IngredientState.BURNT]: {
                    canBeCut: false,
                    canBeCooked: false,
                    canBePlated: false,
                    mustBePlated: false,
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
                },
                [IngredientState.CHOPPED]: {
                    canBeCut: false,
                    canBeCooked: true,
                    canBePlated: false,
                    mustBePlated: false,
                },
                [IngredientState.COOKING]: {
                    canBeCut: false,
                    canBeCooked: false,
                    canBePlated: false,
                    mustBePlated: false,
                },
                [IngredientState.COOKED]: {
                    canBeCut: false,
                    canBeCooked: false,
                    canBePlated: true,
                    mustBePlated: true,
                },
                [IngredientState.BURNT]: {
                    canBeCut: false,
                    canBeCooked: false,
                    canBePlated: false,
                    mustBePlated: false,
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
                },
                [IngredientState.CHOPPED]: {
                    canBeCut: false,
                    canBeCooked: true,
                    canBePlated: false,
                    mustBePlated: false,
                },
                [IngredientState.COOKING]: {
                    canBeCut: false,
                    canBeCooked: false,
                    canBePlated: false,
                    mustBePlated: false,
                },
                [IngredientState.COOKED]: {
                    canBeCut: false,
                    canBeCooked: false,
                    canBePlated: true,
                    mustBePlated: false,
                },
                [IngredientState.BURNT]: {
                    canBeCut: false,
                    canBeCooked: false,
                    canBePlated: false,
                    mustBePlated: false,
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
                },
                [IngredientState.CHOPPED]: {
                    canBeCut: false,
                    canBeCooked: true,
                    canBePlated: false,
                    mustBePlated: false,
                },
                [IngredientState.COOKING]: {
                    canBeCut: false,
                    canBeCooked: false,
                    canBePlated: false,
                    mustBePlated: false,
                },
                [IngredientState.COOKED]: {
                    canBeCut: false,
                    canBeCooked: false,
                    canBePlated: true,
                    mustBePlated: false,
                },
                [IngredientState.BURNT]: {
                    canBeCut: false,
                    canBeCooked: false,
                    canBePlated: false,
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
