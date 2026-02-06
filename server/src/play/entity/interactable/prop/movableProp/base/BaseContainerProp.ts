import { BaseMovableProp } from './BaseMovableProp';
import type { ContainerType } from '../../../../../const/ContainerConst';
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
    protected _type: ContainerType | null = null;
    /**
     * 食材道具ID / Food prop ID
     */
    private _foodsId: string | null = null;

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
            this.placeToContainer(containerId);
        }
    }

    public async onInteract(event: GameInteractEvent): Promise<void> {
        super.onInteract(event);
        if (!this._type) {
            throw new Error('PlateProp: type is null');
        }

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
                    type: this._type,
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
        const container = this.container as BaseImmovableProp;
        container.removePlacedProp();
        this.leaveContainer();
    }

    /**
     * 食材道具 / Food prop
     */
    public get foods(): BaseMovableProp | null {
        return this.getInteractable(this._foodsId) as BaseMovableProp | null;
    }

    /**
     * 放置食材 / Place food
     * @param foodsId 食材道具ID / Food prop ID
     */
    public placeFoods(foodsId: string): void {
        this._foodsId = foodsId;
    }

    /**
     * 移除食材 / Remove food
     */
    public removeFoods(): void {
        this._foodsId = null;
    }

    public get container(): BaseImmovableProp | null {
        return super.container as BaseImmovableProp | null;
    }
}
