import { BaseMovableProp } from '../base/BaseMovableProp';
import { FactoryToken } from '@src/framework/common/factory/AbstractFactory';
import { InteractableType } from '../../../../../const/TokenConst';
import { ContainerState } from '../../../../../const/ContainerConst';
import type { IInteractableData } from '../../../../../data/InteractableData';
import { PlayerMgr } from '../../../../../mgr/PlayerMgr';
import type { InGamePlayer } from '../../../../player/GamePlayer';
import { InteractableMgr } from '../../../../../mgr/InteractableMgr';
import type { TableProp } from '../../TableProp';

/**
 * 盘子道具 / Plate prop
 */
@FactoryToken(InteractableType.PlateProp)
export class PlateProp extends BaseMovableProp {
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
        // 获取关联的桌子
        const table = InteractableMgr.instance.getInteractable(
            `table_${config.entityConfig?.position?.x}_${config.entityConfig?.position?.z}`
        );
        // 绑定关联的桌子
        if (table) {
            this.table = table as TableProp;
            this.table.tableProps = this;
        }
    }

    public async onInteract(event: GameInteractEvent): Promise<void> {
        super.onInteract(event);
        const { entity } = event;
        const player = PlayerMgr.instance.getPlayer(
            entity.player.userId
        ) as InGamePlayer;
        if (player.carryingProp) {
            // 如果玩家拿着某道具
            // more...
        } else {
            // 玩家没有拿着道具
            player.carryingProp = {
                container: {
                    type: 'plate',
                    state: ContainerState.CLEAN,
                },
                foods: [],
            };
            this.foods?.wear(player);
            this.wear(player);
        }
    }

    public destroy(): void {
        super.destroy();
        // 解除关联
        this.table!.tableProps = null;
        this.table = null;
    }
}
