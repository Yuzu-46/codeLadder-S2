import type { MachineConfig, MachineOptions } from '@dao3fun/fsm';
import { StateMachine } from '@dao3fun/fsm';

/**
 * 状态机 / Finite State Machine
 */
export class FiniteStateMachine<S extends string, E extends string> {
    private _fsm: StateMachine<S, E>;
    private _entity: GameEntity;

    /**
     * 创建状态机 / Create a finite state machine
     * @param config 状态机配置 / State machine configuration
     * @param options 状态机选项 / State machine options
     * @param entity 实体 / Entity
     * @description 实体仅用于fsm注册
     */
    constructor(
        config: MachineConfig<S, E>,
        options?: MachineOptions<S, E>,
        entity?: GameEntity
    ) {
        this._fsm = new StateMachine(config, options);
        if (entity) {
            this._entity = entity;
        } else {
            this._entity = world.createEntity({
                id: 'fsm',
                collides: false,
                meshScale: new GameVector3(0, 0, 0),
            })!;
        }
        this._fsm.register(this._entity);
    }

    /**
     * 销毁状态机 / Destroy the state machine
     */
    public destroy(): void {
        this._entity.destroy();
    }

    /**
     * 当前状态 / Current state
     */
    public get State(): S {
        return this._fsm.stateOf(this._entity) as S;
    }

    /**
     * 订阅任意实体的状态迁移 / Subscribe to any entity's state transition
     * @param listener 监听函数 / Listener function
     */
    public subscribe(listener: (next: S, prev: S) => void): () => boolean {
        return this._fsm.subscribe((_, next, prev) =>
            listener(next as S, prev as S)
        );
    }

    /**
     * @zh
     * 帧更新：如项目为 Tick 驱动，可在主循环中调用此方法。
     * 如果当前状态定义了 onUpdate，则会被调用（可异步）。
     * @en
     * Frame update: If the project is driven by Tick, call this method in the main loop.
     * If the current state defines onUpdate, it will be called (asynchronous).
     * @param deltaTime 时间增量 / Time increment
     */
    public update(deltaTime: number): Promise<void> {
        return this._fsm.update(this._entity, deltaTime);
    }

    /**
     * 判断实体在当前状态下是否可以响应 event 进行迁移（考虑 guard）
     * Check whether the entity can respond to event to migrate (considering guard)
     * @param event 事件名称 / Event name
     * @returns 是否可以 / Can
     */
    public can(event: E): boolean {
        return this._fsm.can(this._entity, event);
    }

    /**
     * 计算实体在给定事件下的下一个状态（不改变当前状态）
     * Calculate the next state of the entity given the event (without changing the current state)
     * @param event 事件名称 / Event name
     * @returns 下一个状态名称 / Next state name
     */
    public getNextState(event: E): S | null {
        return this._fsm.getNextState(this._entity, event);
    }

    /**
     * 触发实体的事件并尝试迁移：若通过 guard，则执行 action 并更新该实体的当前状态
     * Trigger the event of the entity and try to migrate: If passed guard, execute action and update the current state of the entity
     * @param event 事件名称 / Event name
     * @returns 是否发生了迁移 / Whether a transition occurred
     */
    public send(event: E): Promise<boolean> {
        return this._fsm.send(this._entity, event);
    }
}
