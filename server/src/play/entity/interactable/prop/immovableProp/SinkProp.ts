import { BaseImmovableProp } from './BaseImmovableProp';
import { FactoryToken } from '@src/framework/common/factory/AbstractFactory';
import { InteractableType } from '../../../../const/TokenConst';

/**
 * 洗手池道具 / Sink Prop
 */
FactoryToken(InteractableType.SinkProp);
export class SinkProp extends BaseImmovableProp {}
