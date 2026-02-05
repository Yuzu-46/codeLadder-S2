import { BaseMovableProp } from './BaseMovableProp';
import { ContainerState } from '../../../../../const/ContainerConst';
import type { IInteractableData } from '../../../../../data/InteractableData';
import { PlayerMgr } from '../../../../../mgr/PlayerMgr';
import type { InGamePlayer } from '../../../../player/GamePlayer';
import { InteractableMgr } from '../../../../../mgr/InteractableMgr';
import type { BaseImmovableProp } from '../../immovableProp/BaseImmovableProp';

/**
 * 容器道具基类 / Container prop base class
 */
export abstract class BaseContainerProp extends BaseMovableProp {
    /**
     * 食材道具 / Food prop
     */
    public foods: BaseMovableProp | null = null;

    public start(config: IInteractableData): void {
        super.start(config);
        console.log('(Server) PlateProp start with id ', config.id);
        this._type = 'plate';
        // 获取关联的桌子
        const containerId = ['table', 'stove']
            .map(
                (propType) =>
                    `${propType}_${config.entityConfig?.position?.x}_${config.entityConfig?.position?.z}`
            )
            .find((propId) => InteractableMgr.instance.getInteractable(propId));
        if (containerId) {
            const container = InteractableMgr.instance.getInteractable(
                containerId
            ) as BaseImmovableProp;

            // 绑定关联的桌子
            container.placeProp(this.id);
            this._containerId = containerId;
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
    }
}
