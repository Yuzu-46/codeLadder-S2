import type { ISceneConfig, ISceneData } from '../data/SceneData';

/**
 * 场景类型 / Scene type
 */
export enum SceneType {
    /**
     * 主图
     */
    Main = 'main',
    /**
     * 汉堡店
     */
    HamburgerRestaurant = 'hamburgerRestaurant',
}

/**
 * 场景配置 / Scene configuration
 */
export const SceneConfig: ISceneConfig<SceneType> = {
    data: {
        main: null as unknown as ISceneData,
        hamburgerRestaurant: {
            id: SceneType.HamburgerRestaurant,
            link: {
                edit: '/edit/b1a1bd12335e46fde617',
                play: '/play/0d02da68a974b1ddea79',
            },
            name: '汉堡店',
            desc: '一个汉堡店',
            terrainMap: [
                // 围墙
                {
                    start: [10, 15],
                    end: [52, 47],
                    voxelId: 137,
                },
                {
                    start: [11, 16],
                    end: [51, 46],
                    voxelId: 0,
                },
                {
                    start: [31, 16],
                    end: [31, 26],
                    voxelId: 137,
                },
                {
                    start: [31, 36],
                    end: [31, 46],
                    voxelId: 137,
                },
                // 出餐口
                {
                    start: [52, 28],
                    end: [52, 34],
                    voxelId: 650,
                },
            ],
        },
    },
};

/**
 * 场景列表 / Scene list
 */
export const SceneList = Object.values(SceneConfig.data).filter(
    (scene) => !!scene
);
