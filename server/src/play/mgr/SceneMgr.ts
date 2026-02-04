import { Singleton } from '../../framework/common/Singleton';
import { SceneConfig, SceneType } from '../config/SceneConfig';
import type { ISceneData } from '../data/SceneData';

/**
 * 场景管理器
 */
export class SceneMgr extends Singleton<SceneMgr>() {
    // /**
    //  * 场景映射 / Scene mapping
    //  */
    // private _sceneMap: Map<string, ISceneData> = new Map();

    constructor() {
        super();
        console.log('(Server) SceneMgr constructor');
    }

    /**
     * 启动场景管理器 / Start scene manager
     * @param mapId 地图ID / Map ID
     */
    public start(mapId: string): void {
        // 如果是主地图，则不需要启动
        if (mapId === SceneType.Main) {
            return;
        }
        console.log('(Server) SceneMgr start');
        try {
            this.createScene(mapId as SceneType);
        } catch (error) {
            throw new Error(`(Server) SceneMgr start error: ${error}`);
        }
    }

    // /**
    //  * 注册场景 / Register scene
    //  */
    // private registerScenes(): void {
    //     Object.values(SceneConfig.data).forEach((scene) => {
    //         this._sceneMap.set(scene.id, scene);
    //     });
    // }

    /**
     * 创建场景 / Create scene
     * @param type 创建场景类型 / Create scene type
     */
    private createScene(type: SceneType): void {
        const scene = SceneConfig.data[type];
        if (!scene) {
            throw new Error(
                `(Server) SceneMgr createScene error: scene ${type} not found`
            );
        }

        const { terrainMap } = scene;
        scene.terrainMap.forEach((map) => {
            if (map.start[0] > map.end[0] || map.start[1] > map.end[1]) {
                throw new Error(
                    `(Server) SceneMgr createScene error: scene ${type} terrainMap start > end`
                );
            }
            for (let x = map.start[0]; x <= map.end[0]; x++) {
                for (let z = map.start[1]; z <= map.end[1]; z++) {
                    voxels.setVoxelId(x, 1, z, map.voxelId);
                    voxels.setVoxelId(x, 2, z, map.voxelId);
                }
            }
        });
    }
}
