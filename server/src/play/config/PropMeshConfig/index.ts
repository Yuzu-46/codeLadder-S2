import type { IPropMeshConfig } from '../../data/PropMeshData';

/**
 * 模型资源配置 / Model configuration
 */
export const PropMeshConfig: IPropMeshConfig = {
    plate: {
        clean: 'mesh/盘子.vb',
        dirty: 'mesh/盘子.vb',
    },
    bread: {
        raw: 'mesh/面包.vb',
        chopped: 'mesh/面包.vb',
        cooked: 'mesh/面包.vb',
    },
    meat: {
        raw: 'mesh/牛肉.vb',
    },
    vegetable: {
        raw: 'mesh/蔬菜.vb',
    },
    tomato: {
        raw: 'mesh/番茄.vb',
    },
    meatBurger: {},
    mixedBurger: {},
    nutritiousBurger: {},
    beefSoup: {},
};
