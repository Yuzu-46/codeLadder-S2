import type { IInteractableData } from '../../../data/InteractableData';

/**
 * 可交互的 / Interactable
 */
export class Interactable {
    /**
     * 唯一标识
     */
    protected id: string = '';
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
     * @param entity 可交互对象实体
     * 如果entity不为空，则使用entity作为实体
     */
    public start(config: IInteractableData, entity?: GameEntity): void {
        this.id = config.id;
        if (entity) {
            this.entity = entity;
        } else {
            this.entity = world.createEntity({
                id: this.id,
                fixed: true, // 默认固定位置
                ...config.entityConfig,
            });
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
            entity.interactRadius = interactRadius || 3;
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
}
