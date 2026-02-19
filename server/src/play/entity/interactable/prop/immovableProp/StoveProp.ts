import { BaseImmovableProp } from './BaseImmovableProp';
import { FactoryToken } from '@src/framework/common/factory/AbstractFactory';
import { InteractableType } from '../../../../const/TokenConst';
import type { IInteractableData } from '../../../../data/InteractableData';
import { PropBindingMgr } from '../../../../mgr/PropBindingMgr';
import type { InGamePlayer } from '../../../player/GamePlayer';
import { ConfigMgr } from '../../../../mgr/ConfigMgr';
import { EventEmitter } from '../../../../../framework/common/EventEmitter';
import type { IPropBindingEventData } from '../../../../data/EventData';
import { PropEvent } from '../../../../const/EventConst';

/**
 * 灶台道具 / Stove Prop
 */
@FactoryToken(InteractableType.StoveProp)
export class StoveProp extends BaseImmovableProp {
    private _bindingUpdateHandler:
        | ((payload?: IPropBindingEventData) => void)
        | null = null;
    private _bindingDeleteHandler:
        | ((payload?: IPropBindingEventData) => void)
        | null = null;

    public start(config: IInteractableData): void {
        super.start(config);
        console.log('(Server) StoveProp start with id ', config.id);

        PropBindingMgr.instance.addBinding({
            staticContainerId: this.id,
        });

        this.bindPropBindingEvents();
    }

    public destroy(): void {
        super.destroy();
        this.unbindPropBindingEvents();
    }

    protected onInteractWithDynamicContainer(
        dynamicContainerId: string,
        event: GameInteractEvent
    ): void {
        this.getInteractable(dynamicContainerId)?.onInteract(event);
    }

    protected onInteractWithFood(
        foodId: string,
        event: GameInteractEvent
    ): void {
        // 触发此方法说明灶台没有锅却有食物，抛出错误
        throw new Error(
            `StoveProp ${this.id} interacted with food ${foodId} but has no pot bound!`
        );
    }

    protected onInteractWithoutBound(player: InGamePlayer): void {
        if (
            this.entity &&
            player.carryingProp.container &&
            ConfigMgr.instance.getContainerConfig(
                player.carryingProp.container.type,
                player.carryingProp.container.state
            )?.canBePlacedOnStove
        ) {
            player.placeProp(this.entity.position, this);
        }
    }

    /**
     * 绑定道具绑定事件 / Bind Prop Binding Events
     */
    private bindPropBindingEvents(): void {
        this._bindingUpdateHandler = this.onPropBindingUpdate.bind(this);
        EventEmitter.instance.on<IPropBindingEventData>(
            PropEvent.BindingUpdate,
            this._bindingUpdateHandler
        );

        this._bindingDeleteHandler = this.onPropBindingDelete.bind(this);
        EventEmitter.instance.on<IPropBindingEventData>(
            PropEvent.BindingUpdate,
            this._bindingUpdateHandler
        );
    }

    /**
     * 解绑道具绑定事件 / Unbind prop binding event
     */
    private unbindPropBindingEvents(): void {
        if (this._bindingUpdateHandler) {
            EventEmitter.instance.off<IPropBindingEventData>(
                PropEvent.BindingUpdate,
                this._bindingUpdateHandler
            );
        }

        if (this._bindingDeleteHandler) {
            EventEmitter.instance.off<IPropBindingEventData>(
                PropEvent.BindingDelete,
                this._bindingDeleteHandler
            );
        }
    }

    /**
     * 绑定更新 / Binding update
     * @param event 事件数据 / Event data
     */
    private onPropBindingUpdate(event?: IPropBindingEventData): void {}

    /**
     * 绑定删除 / Binding delete
     * @param event 事件数据 / Event data
     */
    private onPropBindingDelete(event?: IPropBindingEventData): void {}
}
