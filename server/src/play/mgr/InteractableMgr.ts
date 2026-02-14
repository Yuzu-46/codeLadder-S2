import { factory } from '../../framework/common/factory/AbstractFactory';
import { Singleton } from '../../framework/common/Singleton';
import { InteractableType } from '../const/TokenConst';
import type { IInteractableData } from '../data/InteractableData';
import { InteractableConfig } from '../config/InteractableConfig';
import type { Interactable } from '../entity/interactable/base/Interactable';
import type { SceneType } from '../config/SceneConfig';
import { PortalNpc } from '../entity/interactable/npc/PortalNpc';
import {
    BinProp,
    FoodBoxProp,
    StoveProp,
    TableProp,
    TablePropWithChoppingBoard,
} from '../entity/interactable/prop/immovableProp';
import {
    PlateProp,
    PanProp,
    PotProp,
    FoodProp,
} from '../entity/interactable/prop/movableProp';

/**
 * 可交互对象管理器 / Interactable manager
 */
export class InteractableMgr extends Singleton<InteractableMgr>() {
    private _interactableMap: Map<string, Interactable> = new Map();
    constructor() {
        super();
        console.log('(Server) InteractableMgr constructor');
    }

    /**
     * 启动 / Start
     * @param id 地图ID / Map ID
     */
    public start(mapId: string): void {
        this.registerInteractables();
        try {
            InteractableConfig.data[mapId as SceneType].forEach((config) => {
                this.createInteractable(config);
            });
        } catch (e) {
            console.warn(`(Server) InteractableMgr ${e}, mapId:${mapId}`);
        }
        this.bindInteractEvents();
    }

    /**
     * 注册可交互对象 / Register interactable objects
     */
    public registerInteractables(): void {
        factory.registerByToken(
            InteractableType.PortalNpc as string,
            PortalNpc,
            {
                singleton: false,
                token: InteractableType.PortalNpc,
            }
        );

        factory.registerByToken(
            InteractableType.TableProp as string,
            TableProp,
            {
                singleton: false,
                token: InteractableType.TableProp,
            }
        );

        factory.registerByToken(
            InteractableType.TablePropWithChoppingBoard as string,
            TablePropWithChoppingBoard,
            {
                singleton: false,
                token: InteractableType.TablePropWithChoppingBoard,
            }
        );

        factory.registerByToken(
            InteractableType.StoveProp as string,
            StoveProp,
            {
                singleton: false,
                token: InteractableType.StoveProp,
            }
        );

        factory.registerByToken(
            InteractableType.FoodBoxProp as string,
            FoodBoxProp,
            {
                singleton: false,
                token: InteractableType.FoodBoxProp,
            }
        );

        factory.registerByToken(InteractableType.BinProp as string, BinProp, {
            singleton: false,
            token: InteractableType.BinProp,
        });

        factory.registerByToken(
            InteractableType.PlateProp as string,
            PlateProp,
            {
                singleton: false,
                token: InteractableType.PlateProp,
            }
        );

        factory.registerByToken(InteractableType.PanProp as string, PanProp, {
            singleton: false,
            token: InteractableType.PanProp,
        });

        factory.registerByToken(InteractableType.FoodProp as string, FoodProp, {
            singleton: false,
            token: InteractableType.FoodProp,
        });

        factory.registerByToken(InteractableType.PotProp as string, PotProp, {
            singleton: false,
            token: InteractableType.PotProp,
        });
    }

    /**
     * 绑定交互事件 / Bind interact events
     */
    private bindInteractEvents(): void {
        world.onInteract((event) => {
            this.onInteract(event);
        });
    }

    private async onInteract(event: GameInteractEvent): Promise<void> {
        const interactable = this._interactableMap.get(event.targetEntity.id);
        if (interactable) {
            interactable.onInteract(event);
        } else {
            console.warn('(Server) InteractableMgr no interactable found');
        }
    }

    /**
     * 添加可交互对象 / Add interactable
     * @param id 可交互对象ID / Interactable ID
     * @param interactable 可交互对象实例 / Interactable instance
     */
    private addInteractable(id: string, interactable: Interactable) {
        this._interactableMap.set(id, interactable);
    }

    /**
     * 移除可交互对象 / Remove interactable
     * @param id 可交互对象ID / Interactable ID
     */
    private removeInteractable(id: string): void {
        this._interactableMap.delete(id);
    }

    /**
     * 通过配置创建可交互对象 / Create interactable by config
     * @param config 可交互对象配置 / Interactable config
     */
    public createInteractable(config: IInteractableData): Interactable {
        const interactable = factory.createByToken(
            config.token
        ) as Interactable;
        const id: string =
            typeof config.id === 'string' ? config.id : config.id();
        this.addInteractable(id, interactable);
        interactable.start({ ...config, id });
        return interactable;
    }

    /**
     * 销毁可交互对象 / Destroy interactable
     * @param id 可交互对象ID / Interactable ID
     */
    public destroyInteractable(id: string): void {
        const interactable = this.getInteractable(id);
        if (interactable) {
            this.removeInteractable(id);
            interactable.destroy();
        }
    }

    /**
     * 获取可交互对象 / Get interactable
     * @param id 可交互对象ID / Interactable ID
     * @returns 可交互对象实例 / Interactable instance
     */
    public getInteractable(id: string): Interactable | undefined {
        return this._interactableMap.get(id);
    }
}
