/**
 * 场景数据
 */
export interface ISceneData {
    /**
     * 场景ID
     */
    id: string;
    /**
     * 链接
     */
    link: IMapLink;
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
    terrainMap: voxelId[][];
}

/**
 * 场景配置 / Scene configuration
 */
export interface ISceneConfig<T extends string> {
    /**
     * 场景数据列表 / Scene data list
     */
    data: Record<T, ISceneData>;
}

/**
 * 地图链接 / Map link
 */
export interface IMapLink {
    /**
     * 编辑链接 / Edit link
     */
    edit: string;
    /**
     * 游玩链接 / Play link
     */
    play: string;
}
