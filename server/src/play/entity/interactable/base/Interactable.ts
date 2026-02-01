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
     */
    public start(config: IInteractableData): void {
        this.id = config.id;
        this.entity = world.createEntity({
            fixed: true, // 默认固定位置
            ...config.entityConfig,
        });
        if (this.entity) {
            this.entity.interactColor.copy(new GameRGBColor(255, 255, 255));
            this.entity.interactHint = config.interactHint;
            this.entity.interactRadius = config.interactRadius || 3;
            // entity.interactSound;
            this.entity.enableInteract = true;
            console.log(`(Server) Interactable ${this.id} start`);
        } else {
            console.warn(`(Server) Interactable ${this.id} entity not found`);
        }

        // this.bindInteractEvents();
    }

    /**
     * 绑定交互事件
     */
    private bindInteractEvents(): void {}

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
