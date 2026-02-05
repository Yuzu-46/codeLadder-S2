/**
 * 容器类型 / Container type
 */
export type ContainerType = 'plate';

/**
 * 容器状态 / Container state
 */
export enum ContainerState {
    /**
     * 干净的
     */
    CLEAN = 0,

    /**
     * 脏的
     */
    DIRTY = 1,
}
