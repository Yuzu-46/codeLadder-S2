import { factory } from '../../framework/common/factory/AbstractFactory';
import { Singleton } from '../../framework/common/Singleton';
import { NpcType } from '../const/TokenConst';
import type { INpcData } from '../data/NpcData';
import { NpcConfig } from '../const/NpcConst';
import type { BaseNpc } from '../entity/npc/BaseNpc';

/**
 * NPC管理器 / NPC Manager
 */
export class NpcMgr extends Singleton<NpcMgr>() {
    private _npcMap: Map<string, BaseNpc> = new Map();
    constructor() {
        super();
        console.log('(Server) NpcMgr constructor');
    }

    /**
     * 启动 / Start
     * @param id 地图ID / Map ID
     */
    public start(id: number | string): void {
        this.registerNpcs();
        if (id === 'main') {
            NpcConfig.data.forEach((config) => {
                this.createNpc(config);
            });
        }
        this.bindInteractEvents();
    }

    /**
     * 注册NPC / Register NPCs
     */
    public registerNpcs(): void {}

    /**
     * 绑定交互事件 / Bind interact events
     */
    private bindInteractEvents(): void {
        world.onInteract((event) => {
            this.onInteract(event);
        });
    }

    private async onInteract(event: GameInteractEvent): Promise<void> {
        const npc = this._npcMap.get(event.targetEntity.id);
        if (npc) {
            await npc.onInteract(event);
        }
    }

    /**
     * 添加NPC / Add NPC
     * @param id NPC ID / NPC ID
     * @param npc NPC / NPC
     */
    private addNpc(id: string, npc: BaseNpc) {
        this._npcMap.set(id, npc);
    }

    /**
     * 移除NPC / Remove NPC
     * @param id NPC ID / NPC ID
     */
    private removeNpc(id: string): void {
        this._npcMap.delete(id);
    }

    /**
     * 通过配置创建NPC / Create NPC by config
     */
    public createNpc(config: INpcData): BaseNpc {
        const npc = factory.createByToken(config.token) as BaseNpc;
        this.addNpc(config.id, npc);
        npc.start(config);
        return npc;
    }

    /**
     * 销毁NPC / Destroy NPC
     * @param id NPC ID
     */
    public destroyNpc(id: string): void {
        const npc = this.getNpc(id);
        if (npc) {
            this.removeNpc(id);
            npc.destroy();
        }
    }

    /**
     * 获取NPC
     * @param id NPC ID
     * @returns NPC
     */
    public getNpc(id: string): BaseNpc | undefined {
        return this._npcMap.get(id);
    }
}
