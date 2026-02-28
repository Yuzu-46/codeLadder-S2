import { BaseImmovableProp } from './BaseImmovableProp';
import { FactoryToken } from '@src/framework/common/factory/AbstractFactory';
import { InteractableType } from '../../../../const/TokenConst';
import type { ISinkPropConfig } from '../../../../data/InteractableData';
import type { ContainerType } from '../../../../const/ContainerConst';
import { ContainerState } from '../../../../const/ContainerConst';
import { ConfigMgr } from '../../../../mgr/ConfigMgr';
import type { IMovablePropData } from '../../../../data/MovablePropData';
import { PropMgr } from '../../../../mgr/PropMgr';
import { PlayerMgr } from '../../../../mgr/PlayerMgr';
import type { InGamePlayer } from '../../../player/GamePlayer';

/**
 * 洗碗池道具 / Sink Prop
 */
FactoryToken(InteractableType.SinkProp);
export class SinkProp extends BaseImmovableProp {
    /**
     * 洗涤位置 / Washing position
     */
    private _washPosition: GameVector3 | null = null;

    /**
     * 干净餐具位置 / Clean dish position
     */
    private _cleanPosition: GameVector3 | null = null;

    /**
     * 洗涤的容器道具类型 / Washing container prop type
     */
    private _washingContainerType: ContainerType | null = null;

    /**
     * 洗碗池里的道具实体 / Prop entity in the sink
     */
    private _propInSink: GameEntity | null = null;

    public start(config: ISinkPropConfig): void {
        super.start(config);
        console.log('(Server) SinkProp start with id ', config.id);
        this._washPosition = config.washPosition;
        this._cleanPosition = config.cleanPosition;
    }

    /**
     * 创建容器实体 / Create container entity
     * @param type 容器道具类型 / Container prop type
     * @param position 容器位置 / Container position
     */
    private createContainerEntity(type: ContainerType, position: GameVector3) {
        this._washingContainerType = type;
        const propConfig = ConfigMgr.instance.getMovablePropConfig(
            type
        ) as IMovablePropData<ContainerState>;
        const config = propConfig.interactableConfig;
        const { mesh } = propConfig.states[ContainerState.DIRTY] || {};

        this.entity = world.createEntity({
            ...config.entityConfig,
            mesh: mesh,
            position: config.offset?.add(position) || position,
        });
    }

    /**
     * 销毁容器实体 / Destroy container entity
     */
    private destroyContainerEntity() {
        this._washingContainerType = null;
        this.entity?.destroy();
        this.entity = null;
    }

    /**
     * 创建洗净的道具 / Create washed prop
     * @param type 容器道具类型 / Container prop type
     * @param position 容器位置 / Container position
     */
    private createWashedProp(type: ContainerType, position: GameVector3) {
        PropMgr.instance.placeProp(
            {
                container: {
                    type,
                    state: ContainerState.CLEAN,
                },
                foods: [],
            },
            position
        );
    }

    public onInteract(event: GameInteractEvent): void {
        const player = PlayerMgr.instance.getPlayer(
            event.entity.player.userId
        ) as InGamePlayer | undefined;
        if (player) {
            const propData = player.carryingProp;
            if (
                propData.container?.state === ContainerState.DIRTY &&
                propData.foods.length === 0 &&
                !this.entity &&
                this._washPosition
            ) {
                player.removeContainerProp();
                this.createContainerEntity(
                    propData.container.type,
                    this._washPosition!
                );
            }
        }
    }
}
