import type { ISceneData } from '../../data/SceneData';
import { SceneType } from './SceneType';

/**
 * 天梯S2 定制场景 / CodeLadderS2 Scene
 */
export const codeLadderS2: ISceneData = {
    id: SceneType.CodeLadderS2,
    link: {
        edit: '/edit/b28b47cb47c6dfe8152f',
        play: '/play/d0a4feaab63396a28755',
    },
    name: '天梯S2 定制',
    desc: '为参加天梯S2定制的场景',
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
};
