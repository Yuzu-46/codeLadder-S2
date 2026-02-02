import { Interactable } from '../base/Interactable';
import { FactoryToken } from '@src/framework/common/factory/AbstractFactory';
import { InteractableType } from '@src/play/const/TokenConst';

/**
 * 桌子道具 / Table Prop
 */
@FactoryToken(InteractableType.TableProp)
export class TableProp extends Interactable {}
