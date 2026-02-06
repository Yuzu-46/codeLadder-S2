import type { IFoodConfig } from '../../data/FoodData';
import { FoodState } from '../../const/FoodConst';

export const FoodConfig: IFoodConfig = {
    ingredient: {
        bread: {
            states: {
                [FoodState.RAW]: {
                    canBeCut: true,
                    canBeCooked: true,
                    canBePlated: true,
                    mustBePlated: false,
                    mesh: 'mesh/面包.vb',
                },
                [FoodState.CHOPPED]: {
                    canBeCut: false,
                    canBeCooked: true,
                    canBePlated: true,
                    mustBePlated: false,
                    mesh: 'mesh/面包.vb',
                },
                [FoodState.COOKING]: {
                    canBeCut: false,
                    canBeCooked: false,
                    canBePlated: false,
                    mustBePlated: false,
                    mesh: 'mesh/面包.vb',
                },
                [FoodState.COOKED]: {
                    canBeCut: false,
                    canBeCooked: false,
                    canBePlated: true,
                    mustBePlated: false,
                    mesh: 'mesh/面包.vb',
                },
                [FoodState.BURNT]: {
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
                [FoodState.RAW]: {
                    canBeCut: true,
                    canBeCooked: false,
                    canBePlated: false,
                    mustBePlated: false,
                    mesh: 'mesh/牛肉.vb',
                },
                [FoodState.CHOPPED]: {
                    canBeCut: false,
                    canBeCooked: true,
                    canBePlated: false,
                    mustBePlated: false,
                    mesh: 'mesh/牛肉.vb',
                },
                [FoodState.COOKING]: {
                    canBeCut: false,
                    canBeCooked: false,
                    canBePlated: false,
                    mustBePlated: false,
                    mesh: 'mesh/牛肉.vb',
                },
                [FoodState.COOKED]: {
                    canBeCut: false,
                    canBeCooked: false,
                    canBePlated: true,
                    mustBePlated: true,
                    mesh: 'mesh/牛肉.vb',
                },
                [FoodState.BURNT]: {
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
                [FoodState.RAW]: {
                    canBeCut: true,
                    canBeCooked: false,
                    canBePlated: false,
                    mustBePlated: false,
                    mesh: 'mesh/蔬菜.vb',
                },
                [FoodState.CHOPPED]: {
                    canBeCut: false,
                    canBeCooked: true,
                    canBePlated: false,
                    mustBePlated: false,
                    mesh: 'mesh/蔬菜.vb',
                },
                [FoodState.COOKING]: {
                    canBeCut: false,
                    canBeCooked: false,
                    canBePlated: false,
                    mustBePlated: false,
                    mesh: 'mesh/蔬菜.vb',
                },
                [FoodState.COOKED]: {
                    canBeCut: false,
                    canBeCooked: false,
                    canBePlated: true,
                    mustBePlated: false,
                    mesh: 'mesh/蔬菜.vb',
                },
                [FoodState.BURNT]: {
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
                [FoodState.RAW]: {
                    canBeCut: true,
                    canBeCooked: false,
                    canBePlated: false,
                    mustBePlated: false,
                    mesh: 'mesh/番茄.vb',
                },
                [FoodState.CHOPPED]: {
                    canBeCut: false,
                    canBeCooked: true,
                    canBePlated: false,
                    mustBePlated: false,
                    mesh: 'mesh/番茄.vb',
                },
                [FoodState.COOKING]: {
                    canBeCut: false,
                    canBeCooked: false,
                    canBePlated: false,
                    mustBePlated: false,
                    mesh: 'mesh/番茄.vb',
                },
                [FoodState.COOKED]: {
                    canBeCut: false,
                    canBeCooked: false,
                    canBePlated: true,
                    mustBePlated: false,
                    mesh: 'mesh/番茄.vb',
                },
                [FoodState.BURNT]: {
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
                state: FoodState.RAW,
                count: 1,
            },
            {
                type: 'meat',
                state: FoodState.COOKED,
                count: 1,
            },
        ],
        mixedBurger: [
            {
                type: 'bread',
                state: FoodState.RAW,
                count: 1,
            },
            {
                type: 'meat',
                state: FoodState.COOKED,
                count: 1,
            },
            {
                type: 'vegetable',
                state: FoodState.COOKED,
                count: 1,
            },
        ],
        nutritiousBurger: [
            {
                type: 'bread',
                state: FoodState.RAW,
                count: 1,
            },
            {
                type: 'meat',
                state: FoodState.COOKED,
                count: 1,
            },
            {
                type: 'vegetable',
                state: FoodState.COOKED,
                count: 1,
            },
            {
                type: 'tomato',
                state: FoodState.COOKED,
                count: 1,
            },
        ],
        beefSoup: [
            {
                type: 'meat',
                state: FoodState.COOKED,
                count: 1,
            },
        ],
    },
};
