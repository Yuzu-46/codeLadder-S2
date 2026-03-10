import type { FoodType } from '../const/FoodConst';

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
     * 地形数据 / Terrain data
     * @property start - 地形起始坐标 / Terrain start position
     * @property end - 地形结束坐标 / Terrain end position
     * @property voxelId - 方块ID / Voxel ID
     */
    terrainMap: {
        start: [number, number];
        end: [number, number];
        voxelId: voxelId;
    }[];
    /**
     * 环境实体数据 / Environment entity data
     * @description 创建的实体不参与游戏逻辑，只用于场景初始化
     */
    environmentEntities: Partial<GameEntityConfig>[];
    /**
     * 场景允许的配方 / Scene allowed recipes
     */
    allowedRecipes: FoodType[];
    /**
     * 场景的订单 / Scene orders
     */
    orders: FoodType[];
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
