import type { INpcData } from '../../data/NpcData';

export class BaseNpc {
    /**
     * NPC的唯一标识
     */
    protected id: string = '';
    /**
     * NPC实体
     */
    protected entity: GameEntity | null = null;
    /**
     * 新建NPC实例
     */
    constructor() {}

    /**
     * 启动NPC
     * @param config NPC配置
     */
    public start(config: INpcData): void {
        this.id = config.id;
        this.entity = world.createEntity({
            fixed: true, // NPC固定位置
            ...config.entityConfig,
        });
        if (this.entity) {
            this.entity.interactColor.copy(new GameRGBColor(255, 255, 255));
            this.entity.interactHint = config.interactHint;
            this.entity.interactRadius = config.interactRadius || 3;
            // entity.interactSound;
            this.entity.enableInteract = true;
            console.log(`(Server) Npc ${this.id} start`);
        } else {
            console.warn(`(Server) Npc ${this.id} entity not found`);
        }

        // this.bindInteractEvents();
    }

    /**
     * 绑定交互事件
     */
    private bindInteractEvents(): void {
        const npc = this.entity || world.querySelector(`#${this.id}`)!;
        if (npc) {
            npc.onInteract((event) => {
                this.onInteract(event);
            });
        }
    }

    /**
     * 处理交互事件
     * @param event 交互事件
     */
    public async onInteract(event: GameInteractEvent): Promise<void> {
        console.log(`(Server) Npc ${this.id} interact`);
    }

    /**
     * 销毁NPC
     */
    public destroy(): void {
        if (this.entity) {
            this.entity.destroy();
            this.entity = null;
        }
        console.log(`(Server) Npc ${this.id} destroy`);
    }
}
