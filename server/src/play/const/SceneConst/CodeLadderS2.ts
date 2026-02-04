import type { ISceneData } from '../../data/SceneData';
import { SceneType } from './SceneType';

/**
 * 天梯S2 定制场景 / CodeLadderS2 Scene
 */
const codeLadderS2: ISceneData = {
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
            end: [49, 46],
            voxelId: 137,
        },
        {
            start: [11, 16],
            end: [48, 45],
            voxelId: 0,
        },
        {
            start: [29, 16],
            end: [30, 25],
            voxelId: 137,
        },
        {
            start: [29, 34],
            end: [30, 45],
            voxelId: 137,
        },
        // 出餐口
        {
            start: [49, 28],
            end: [49, 33],
            voxelId: 650,
        },
    ],
};

export default codeLadderS2;
