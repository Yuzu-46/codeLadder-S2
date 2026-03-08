import type { ContainerState, ContainerType } from '../const/ContainerConst';

/**
 * 容器状态配置数据接口 / Container state configuration data interface
 */
export interface IContainerStateConfig {
    /**
     * 是否可以容纳食物 / Can hold food
     */
    canHoldFood: boolean;

    /**
     * 是否可以被清洗 / Can be cleaned
     */
    canBeCleaned: boolean;

    /**
     * 是否可以放在桌子上 / Can be placed on table
     * @deprecated 暂时无用
     */
    canBePlacedOnTable: boolean;

    /**
     * 是否可以放在灶台上 / Can be placed on stove
     */
    canBePlacedOnStove: boolean;

    /**
     * 是否可以烹饪 / Can cook
     */
    canCook: boolean;
}

/**
 * 容器配置接口 / Container configuration interface
 */
export interface IContainerConfig {
    data: Record<ContainerType, Record<ContainerState, IContainerStateConfig>>;
}
