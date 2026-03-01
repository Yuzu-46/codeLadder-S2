import type { Language } from './data/Language';
import type { MessageData } from './data/Message';

/**
 * 远程数据接口 / Remote data interface
 */
interface RemoteData<T> {
    type: RemoteType;
    data: T;
}

/**
 * 客户端事件枚举 / Client event enumeration
 */
enum ClientEvents {
    /**
     * 消息 / Message
     */
    MESSAGE = 'message',
}

/**
 * 服务器事件枚举 / Server event enumeration
 */
enum ServerEvents {
    /**
     * 语言 / Language
     */
    LANGUAGE = 'language',
}

/**
 * 远程类型枚举 / Remote type enumeration
 */
type RemoteType = ClientEvents | ServerEvents;

/**
 * 远程数据接收值类型 / Remote data received value type
 */
type RemoteDataType = RemoteData<Language> | RemoteData<MessageData>;

export { RemoteData, ClientEvents, ServerEvents, RemoteType, RemoteDataType };
