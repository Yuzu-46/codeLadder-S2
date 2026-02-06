import type { FoodType } from '../../../../../const/FoodConst';
import { BaseMovableProp } from './BaseMovableProp';

/**
 * 食材道具基类 / Base food prop
 */
export abstract class BaseFoodProp extends BaseMovableProp {
    protected _type: FoodType[] | null = null;
}
