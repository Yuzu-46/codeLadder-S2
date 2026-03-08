import type { MessageData } from '@shares/data/Message';

/**
 * 事件 / Events
 */
export interface Events {
    message: MessageData;
}

/**
 * 事件发射器 / Event emitter
 */
export const eventEmitter = new EventEmitter<Events>();
