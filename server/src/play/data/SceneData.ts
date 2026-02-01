/**
 * 场景数据
 */
export interface ISceneData {
    /**
     * 场景ID
     */
    id: number;
    /**
     * 场景名称
     */
    name: string;
    /**
     * 场景描述
     */
    desc: string;
    /**
     * 地形数据
     */
    terrainMap: voxelId[][][];
}

/**
 * 场景配置 / Scene configuration
 */
export interface ISceneConfig {
    /**
     * 场景数据列表 / Scene data list
     */
    data: ISceneData[];
}
