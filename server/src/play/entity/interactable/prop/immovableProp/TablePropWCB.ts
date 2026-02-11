import { FactoryToken } from '../../../../../framework/common/factory/AbstractFactory';
import { InteractableType } from '../../../../const/TokenConst';
import type { IInteractableData } from '../../../../data/InteractableData';
import type { InGamePlayer } from '../../../player/GamePlayer';
import { TableProp } from './TableProp';

/**
 * 有切菜板的桌子道具 / Table Prop with chopping board
 */
@FactoryToken(InteractableType.TablePropWithChoppingBoard)
export class TablePropWithChoppingBoard extends TableProp {
    public start(config: IInteractableData): void {
        super.start(config);
    }

    protected onInteractWithDynamicContainer(
        dynamicContainerId: string,
        event: GameInteractEvent
    ): void {
        // 有切菜板的桌子不会有动态容器，所以不可能触发此方法
    }

    protected onInteractWithoutBound(player: InGamePlayer): void {
        // 因为有切菜板的桌子不能放置动态容器类道具，所以只有当玩家没有携带任何容器时才允许与桌子进行交互
        if (!player.carryingProp.container) {
            super.onInteractWithoutBound(player);
        }
    }
}
