import { InteractableMgr } from '../../../../mgr/InteractableMgr';
import { Interactable } from '../../base/Interactable';

/**
 * 静态不可移动道具基类 / Base class for static immovable props
 */
export abstract class BaseImmovableProp extends Interactable {
    /**
     * 放置在上面的可移动道具ID / ID of movable prop placed on top
     */
    protected _placedPropId: string | null = null;

    /**
     * 放置的道具 / Placed prop
     */
    public get placedProp(): Interactable | null {
        if (!this._placedPropId) {
            return null;
        }

        return (
            InteractableMgr.instance.getInteractable(this._placedPropId) || null
        );
    }

    /**
     * 放置道具 / Place prop
     * @param id 放置的道具ID / Prop ID to place
     */
    public async placeProp(id: string): Promise<void> {
        if (this._placedPropId) {
            throw new Error('Prop already placed');
        }

        this._placedPropId = id;
    }

    /**
     * 移除放置的道具 / Remove placed prop
     */
    public removePlacedProp(): void {
        this._placedPropId = null;
    }
}
