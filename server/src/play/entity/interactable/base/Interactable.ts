import type { IInteractableData } from '../../../data/InteractableData';
import { InteractableMgr } from '../../../mgr/InteractableMgr';

/**
 * 可交互的 / Interactable
 */
export abstract class Interactable {
    /**
     * 唯一标识
     */
    protected _id: string = '';
    /**
     * 实体
     */
    protected entity: GameEntity | null = null;
    /**
     * 新建可交互对象
     */
    constructor() {}

    /**
     * 启动可交互对象
     * @param config 可交互对象配置
     */
    public start(config: IInteractableData): void {
        this._id = typeof config.id === 'string' ? config.id : config.id();
        if (config.entity) {
            this.entity = config.entity;
        } else if (config.entityConfig) {
            this.entity = world.createEntity({
                id: this.id,
                fixed: true, // 默认固定位置
                ...config.entityConfig,
                position: config.entityConfig.position?.add(
                    config.offset || new GameVector3(0, 0, 0)
                ),
            });
        } else {
            throw new Error(
                '(Server) Interactable entity or entityConfig is required'
            );
        }

        this.bindInteractEvents(config);
    }

    /**
     * 绑定交互事件（开启交互）
     */
    private bindInteractEvents(config: IInteractableData): void {
        const { entity } = this;
        const { interactColor, interactHint, interactRadius, interactSound } =
            config;
        if (entity) {
            entity.enableInteract = true;
            if (interactColor) {
                entity.interactColor = interactColor;
            }
            entity.interactHint = interactHint || '';
            entity.interactRadius = interactRadius || 2;
            if (interactSound) {
                entity.interactSound = interactSound;
            }
        }
    }

    /**
     * 处理交互事件
     * @param event 交互事件
     */
    public async onInteract(event: GameInteractEvent): Promise<void> {
        console.log(`(Server) Interactable ${this.id} interact`);
    }

    /**
     * 销毁可交互对象
     */
    public destroy(): void {
        if (this.entity) {
            this.entity.destroy();
            this.entity = null;
        }
        console.log(`(Server) Interactable ${this.id} destroy`);
    }

    /**
     * 获取可交互对象 / Get interactable
     * @description 供子类使用
     * @param id 可交互对象ID
     * @returns 可交互对象
     */
    protected getInteractable(id: string | null): Interactable | null {
        if (!id) {
            return null;
        }
        return InteractableMgr.instance.getInteractable(id) || null;
    }

    /**
     * 可交互对象ID
     */
    public get id(): string {
        return this._id;
    }
}
