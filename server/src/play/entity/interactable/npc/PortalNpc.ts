import { Interactable } from '../base/Interactable';
import { FactoryToken } from '@src/framework/common/factory/AbstractFactory';
import { InteractableType } from '@src/play/const/TokenConst';
import { SceneList } from '../../../const/SceneConst';
import type { IInteractableData } from '../../../data/InteractableData';

/**
 * 传送门NPC / Portal NPC
 */
@FactoryToken(InteractableType.PortalNpc)
export class PortalNpc extends Interactable {
    private _sceneList = SceneList;

    public start(config: IInteractableData): void {
        super.start(config);
        this.entity?.motion.setDefaultMotionByName('talk');
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
        }
    }
}
