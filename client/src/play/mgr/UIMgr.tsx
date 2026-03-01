import { Singleton } from '../../framework/common/Singleton';
import React from 'react';
import { createRoot } from '@dao3fun/react-ui/dom';
import { Message } from '../ui/message/Message';

/**
 * UI管理器 / UI manager
 */
export class UIMgr extends Singleton<UIMgr>() {
    constructor() {
        super();
    }

    /**
     * 启动 / Start
     */
    public start(): void {
        console.log('(Client) UIMgr start');
        this.create();
    }

    /**
     * 创建UI / Create UI
     */
    private create(): void {
        const root = createRoot(UiScreen.create());
        root.render(
            <>
                <Message />
            </>
        );
    }
}
