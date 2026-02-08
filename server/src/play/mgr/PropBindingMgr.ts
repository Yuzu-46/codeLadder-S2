import { Singleton } from '../../framework/common/Singleton';
import type { IPropBindingData } from '../data/PropBindingData';

/**
 * 道具绑定管理器 / Prop binding manager
 */
export class PropBindingMgr extends Singleton<PropBindingMgr>() {
    /**
     * 绑定数据映射 / Binding data mapping
     */
    private _bindingMap: Map<string, IPropBindingData> = new Map();

    /**
     * 绑定数据ID映射 / Binding data ID mapping
     */
    private _bindingIds: Map<string, string> = new Map();

    /**
     * 添加道具绑定关系 / Add prop binding relationship
     * @param bindingData 绑定数据 / Binding data
     * @param bindingId 绑定关系ID / Binding relationship ID
     * @returns 是否添加成功 / Whether addition was successful
     */
    public addBinding(
        bindingData: Partial<IPropBindingData>,
        bindingId: string = `binding_${Date.now()}_${Math.floor(Math.random() * 100)}`
    ): boolean {
        if (this._bindingMap.has(bindingId)) {
            return false;
        }

        // 验证绑定数据的有效性
        if (!this.validateBindingData(bindingData)) {
            return false;
        }

        this._bindingMap.set(bindingId, {
            staticContainerId: null,
            dynamicContainerId: null,
            foodId: null,
            ...bindingData,
        });

        // 建立反向索引
        this.buildReverseIndex(bindingId);

        return true;
    }

    /**
     * 获取绑定关系 / Get binding relationship
     * @param bindingId 绑定关系ID / Binding relationship ID
     * @returns 绑定数据或undefined / Binding data or undefined
     */
    public getBinding(bindingId: string): IPropBindingData | undefined {
        return this._bindingMap.get(bindingId);
    }

    /**
     * 更新绑定关系 / Update binding relationship
     * @param bindingId 绑定关系ID / Binding relationship ID
     * @param bindingData 新的绑定数据 / New binding data
     * @returns 是否更新成功 / Whether update was successful
     */
    public updateBinding(
        bindingId: string,
        bindingData: Partial<IPropBindingData>
    ): boolean {
        if (!this._bindingMap.has(bindingId)) {
            return false;
        }

        if (!Object.values(bindingData).length) {
            return false;
        }

        // 移除旧的反向索引
        this.removeReverseIndex(bindingId);

        // 更新绑定数据
        this._bindingMap.set(bindingId, {
            ...this._bindingMap.get(bindingId)!,
            ...bindingData,
        });

        // 建立新的反向索引
        this.buildReverseIndex(bindingId);

        return true;
    }

    /**
     * 通过道具ID更新绑定关系 / Update binding relationship by prop ID
     * @param propId 道具ID / Prop ID
     * @param bindingData 新的绑定关系数据 / New binding relationship data
     * @return 是否更新成功 / Whether to update successfully
     */
    public updateBindingDataByPropId(
        propId: string,
        bindingData: Partial<IPropBindingData>
    ): boolean {
        const bindingId = this._bindingIds.get(propId);
        if (!bindingId) {
            return false;
        }

        // 更新绑定数据
        return this.updateBinding(bindingId, bindingData);
    }

    /**
     * 删除绑定关系 / Remove binding relationship
     * @param bindingId 绑定关系ID / Binding relationship ID
     * @returns 是否删除成功 / Whether removal was successful
     */
    public removeBinding(bindingId: string): boolean {
        const bindingData = this._bindingMap.get(bindingId);
        if (!bindingData) {
            return false;
        }

        // 移除反向索引
        this.removeReverseIndex(bindingId);

        // 移除绑定数据
        this._bindingMap.delete(bindingId);
        return true;
    }

    /**
     * 通过道具ID删除绑定关系 / Remove binding relationship by prop ID
     * @param propId 道具ID / Prop ID
     * @returns 是否删除成功 / Whether removal was successful
     */
    public removeBindingByPropId(propId: string): boolean {
        const bindingId = this._bindingIds.get(propId);
        return bindingId ? this.removeBinding(bindingId) : false;
    }

    /**
     * 检查是否存在绑定关系 / Check if binding relationship exists
     * @param bindingId 绑定关系ID / Binding relationship ID
     * @returns 是否存在 / Whether exists
     */
    public hasBinding(bindingId: string): boolean {
        return this._bindingMap.has(bindingId);
    }

    /**
     * 通过道具ID检查是否存在绑定关系 / Check if binding relationship exists by prop ID
     * @param propId 道具ID / Prop ID
     * @returns 是否存在 / Whether exists
     */
    public hasBindingByPropId(propId: string): boolean {
        return this._bindingIds.has(propId);
    }

    /**
     * 获取所有绑定关系ID / Get all binding relationship IDs
     * @returns 绑定关系ID数组 / Array of binding relationship IDs
     */
    public getAllBindingIds(): string[] {
        return Array.from(this._bindingMap.keys());
    }

    /**
     * 验证绑定数据的有效性 / Validate binding data validity
     * @param bindingData 绑定数据 / Binding data
     * @returns 是否有效 / Whether valid
     */
    private validateBindingData(
        bindingData: Partial<IPropBindingData>
    ): boolean {
        // 至少需要有一个有效的ID
        const hasValidId =
            bindingData.staticContainerId ||
            bindingData.dynamicContainerId ||
            bindingData.foodId;

        return !!hasValidId;
    }

    /**
     * 清空所有绑定关系 / Clear all binding relationships
     */
    public clearAllBindings(): void {
        this._bindingMap.clear();
        this._bindingIds.clear();
    }

    /**
     * 获取绑定关系数量 / Get binding relationship count
     * @returns 绑定关系数量 / Number of binding relationships
     */
    public getBindingCount(): number {
        return this._bindingMap.size;
    }

    /**
     * 获取道具的绑定数据 / Get prop binding data
     * @param propId 道具ID / Prop ID
     * @returns
     * - bindingId: 绑定关系ID / Binding relationship ID
     * - bindingData: 绑定数据 / Binding data
     */
    public getBindingDataByPropId(propId: string): {
        bindingId: string | undefined;
        bindingData: IPropBindingData | undefined;
    } {
        const bindingId = this._bindingIds.get(propId);
        const bindingData = bindingId
            ? this._bindingMap.get(bindingId)
            : undefined;

        return {
            bindingId,
            bindingData,
        };
    }

    /**
     * 建立反向索引 / Build reverse index
     * @param bindingId 绑定关系ID / Binding relationship ID
     */
    private buildReverseIndex(bindingId: string): void {
        const bindingData = this._bindingMap.get(bindingId);
        if (!bindingData) {
            return;
        }
        Object.values(bindingData).forEach((propId) => {
            if (propId !== null) {
                if (this._bindingIds.has(propId)) {
                    throw new Error(
                        `Prop ID ${propId} is already used by another binding relationship.`
                    );
                }
                this._bindingIds.set(propId, bindingId);
            }
        });
    }

    /**
     * 移除反向索引 / Remove reverse index
     * @param bindingId 绑定关系ID / Binding ID
     */
    private removeReverseIndex(bindingId: string): void {
        const bindingData = this._bindingMap.get(bindingId);
        if (!bindingData) {
            return;
        }
        Object.values(bindingData).forEach((propId) => {
            if (propId !== null) {
                this._bindingIds.delete(propId);
            }
        });
    }
}
