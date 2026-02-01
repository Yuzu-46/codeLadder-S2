import { Singleton } from '../../framework/common/Singleton';
import { SceneConfig, SceneType } from '../const/SceneConst';
import type { ISceneData } from '../data/SceneData';

/**
 * 场景管理器
 */
export class SceneMgr extends Singleton<SceneMgr>() {
    /**
     * 场景映射 / Scene mapping
     */
    private _sceneMap: Map<string, ISceneData> = new Map();

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
        this.registerScenes();
        this.createScene(mapId);
    }

    /**
     * 注册场景 / Register scene
     */
    private registerScenes(): void {
        Object.values(SceneConfig.data).forEach((scene) => {
            this._sceneMap.set(scene.id.toString(), scene);
        });
    }

    /**
     * 创建场景 / Create scene
     * @param id
     */
    private createScene(id: string): void {
        const scene = this._sceneMap.get(id);
        if (!scene) {
            throw new Error(
                `(Server) SceneMgr createScene error: scene ${id} not found`
            );
        }

        const { terrainMap } = scene;
        for (let x = 0; x < 63; x++) {
            for (let z = 0; z < 63; z++) {
                if (terrainMap[x][z] === 0) {
                    voxels.setVoxelId(x, 1, z, terrainMap[x][z]);
                    voxels.setVoxelId(x, 2, z, terrainMap[x][z]);
                }
            }
        }
    }
}
