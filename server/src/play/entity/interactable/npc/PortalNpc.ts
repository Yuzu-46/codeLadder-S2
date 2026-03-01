import { Interactable } from '../base/Interactable';
import { FactoryToken } from '@src/framework/common/factory/AbstractFactory';
import { InteractableType } from '@src/play/const/TokenConst';
import { SceneList } from '../../../config/SceneConfig';
import type { IInteractableData } from '../../../data/InteractableData';
import type { IMapLink } from '../../../data/SceneData';

/**
 * 传送门NPC / Portal NPC
 */
@FactoryToken(InteractableType.PortalNpc)
export class PortalNpc extends Interactable {
    private _sceneList = SceneList;

    public start(config: IInteractableData): void {
        super.start(config);
        this.entity?.motion.setDefaultMotionByName('talk');
        console.log('(Server) PortalNpc start with id ', config.id);
    }

    public async onInteract(event: GameInteractEvent): Promise<void> {
        super.onInteract(event);
        const { entity } = event;
        if (entity) {
            const result = await entity.player.dialog<GameSelectDialogParams>({
                type: GameDialogType.SELECT,
                title: '请选择',
                content: '请选择要进入的场景',
                options: this._sceneList.map((scene) => scene.name),
            });

            if (result) {
                try {
                    this.teleport(entity, this._sceneList[result.index].link);
                } catch (error) {
                    console.error(error);
                }
            }
        }
    }

    /**
     * 传送 / Teleport
     * @param entity 玩家实体 / Player entity
     * @param link  / 传送链接 / Teleport link
     */
    private teleport(entity: GamePlayerEntity, link: IMapLink) {
        const { url } = entity.player;

        const host =
            url.host === 'view.dao3.fun'
                ? 'https://dao3.fun'
                : 'https://goboxgame.com';

        const path = url.pathname.includes('/e/') ? link.edit : link.play;

        entity.player.link(host + path, {
            isConfirm: false,
            isNewTab: false,
        });
    }
}
