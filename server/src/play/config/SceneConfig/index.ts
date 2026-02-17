import type { ISceneConfig, ISceneData } from '../../data/SceneData';
import type { SceneType } from '../../const/SceneConst';
import codeLadderS2 from './CodeLadderS2';
import hamburgerRestaurant from './HamburgerRestaurant';

/**
 * 场景配置 / Scene configuration
 */
export const SceneConfig: ISceneConfig<SceneType> = {
    data: {
        main: null as unknown as ISceneData,
        codeLadderS2,
        hamburgerRestaurant,
    },
};

/**
 * 场景列表 / Scene list
 */
export const SceneList = Object.values(SceneConfig.data).filter(
    (scene) => !!scene
);
