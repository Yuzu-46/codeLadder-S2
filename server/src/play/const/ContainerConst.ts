/**
 * 容器类型 / Container type
 */
export type ContainerType =
    | 'plate' // 盘子
    | 'pan' // 煎锅
    | 'pot'; // 煮锅

/**
 * 容器状态 / Container state
 */
export enum ContainerState {
    /**
     * 干净的
     */
    CLEAN = 'clean',

    /**
     * 脏的
     */
    DIRTY = 'dirty',
}

/**
 * 容器事件 / Container event
 */
export enum ContainerEvent {
    /**
     * 污染
     */
    POLLUTE = 'pollute',
    /**
     * 清洗
     */
    CLEAN = 'clean',
}
