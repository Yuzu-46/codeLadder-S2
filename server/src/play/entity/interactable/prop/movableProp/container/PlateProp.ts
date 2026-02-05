import type { BaseMovableProp } from '../base/BaseMovableProp';
import { FactoryToken } from '@src/framework/common/factory/AbstractFactory';
import { InteractableType } from '../../../../../const/TokenConst';
import { ContainerState } from '../../../../../const/ContainerConst';
import type { IInteractableData } from '../../../../../data/InteractableData';
import { PlayerMgr } from '../../../../../mgr/PlayerMgr';
import type { InGamePlayer } from '../../../../player/GamePlayer';
import { InteractableMgr } from '../../../../../mgr/InteractableMgr';
import type { TableProp } from '../../immovableProp/TableProp';
import { BaseContainerProp } from '../base/BaseContainerProp';

/**
 * 盘子道具 / Plate prop
 */
@FactoryToken(InteractableType.PlateProp)
export class PlateProp extends BaseContainerProp {
    /**
     * 食材道具 / Food prop
     */
    public foods: BaseMovableProp | null = null;
    /**
     * 所在的桌子 / Table where the prop is located
     */
    public table: TableProp | null = null;

    public start(config: IInteractableData): void {
        super.start(config);
        console.log('(Server) PlateProp start with id ', config.id);
        this._type = 'plate';
    }

    public async onInteract(event: GameInteractEvent): Promise<void> {
        super.onInteract(event);
    }

    public destroy(): void {
        super.destroy();
    }
}
