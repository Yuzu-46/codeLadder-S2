import { FactoryToken } from '../../../../../../framework/common/factory/AbstractFactory';
import { InteractableType } from '../../../../../const/TokenConst';
import { BaseFoodProp } from '../base/BaseFoodProp';

/**
 * 食物/食材道具（普通） / Food/Ingredient Prop (Normal)
 */
FactoryToken(InteractableType.FoodProp);
export class FoodProp extends BaseFoodProp {}
