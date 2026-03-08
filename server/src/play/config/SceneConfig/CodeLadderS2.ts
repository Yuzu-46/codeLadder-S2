import type { ISceneData } from '../../data/SceneData';
import { SceneType } from '../../const/SceneConst';

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
            start: [12, 17],
            end: [51, 48],
            voxelId: 137,
        },
        {
            start: [13, 18],
            end: [50, 47],
            voxelId: 0,
        },
        {
            start: [31, 18],
            end: [32, 27],
            voxelId: 137,
        },
        {
            start: [31, 36],
            end: [32, 47],
            voxelId: 137,
        },
        // 送餐口
        {
            start: [51, 30],
            end: [51, 33],
            voxelId: 650,
        },
    ],
    environmentEntities: [
        // 切菜板
        ...[
            [18, 47],
            [22, 47],
            [26, 47],
        ].map<Partial<GameEntityConfig>>((pos) => ({
            id: 'choppingBoard_1',
            mesh: 'mesh/砧板.vb',
            position: new GameVector3(pos[0], 1.65, pos[1]),
            meshScale: new GameVector3(0.09, 0.09, 0.09),
        })),
        // 菜刀
        ...[
            [17.5, 47],
            [21.5, 47],
            [25.5, 47],
        ].map<Partial<GameEntityConfig>>((pos) => ({
            id: 'knife_1',
            mesh: 'mesh/菜刀.vb',
            position: new GameVector3(pos[0], 2.1, pos[1]),
            meshScale: new GameVector3(0.04, 0.04, 0.04),
            meshOrientation: new GameQuaternion(0, 0, 0, 1).rotateZ(-0.5),
        })),
        // 不交互的桌子
        {
            id: 'table_1',
            mesh: 'mesh/桌子1.vb',
            position: new GameVector3(50, 1.5, 35),
            meshScale: new GameVector3(0.125, 0.125, 0.125),
            collides: true,
        },
    ],
};

export default codeLadderS2;
