import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Text } from '@dao3fun/react-ui';
import { useScreenSize, useClientRemoteChannel } from '@dao3fun/react-ui/hooks';
import { useMotion } from '@dao3fun/react-motion';
import type { RemoteData } from '@shares/App';
import { ClientEvents } from '@shares/App';
import type { MessageData } from '@shares/data/Message';
import { eventEmitter } from '@src/framework/common/EventEmitter';

/**
 * 消息 / Message
 */
export function Message() {
    const [message, setMessage] = useState<MessageData>();
    const { screenWidth } = useScreenSize();
    const { t } = useTranslation();
    const { lastEvent } = useClientRemoteChannel<RemoteData<MessageData>>();

    /**
     * 起点
     */
    const startPos = Vec2.create({
        x: 0.5,
        y: 0,
    });

    /**
     * 终点
     */
    const endPos = Vec2.create({
        x: 0.5,
        y: 0.2,
    });

    const [style, motion] = useMotion<UiBox>({
        autoPlay: false,
        to: [
            {
                value: {
                    position: { scale: startPos },
                },
                duration: 0,
            },
            {
                value: {
                    position: { scale: endPos },
                },
                duration: 500,
            },
            {
                value: {
                    position: { scale: endPos },
                },
                duration: 1000,
            },
            {
                value: {
                    position: { scale: startPos },
                },
                duration: 500,
            },
        ],
    });

    useEffect(() => {
        /**
         * 处理消息事件
         * @param message 消息 / Message
         */
        const handleMessage = (message: MessageData) => {
            setMessage(message);
            motion.reset();
            motion.play();
        };

        // 挂载时监听事件
        eventEmitter.on('message', handleMessage);

        return () => {
            // 卸载时取消监听事件
            eventEmitter.off('message', handleMessage);
        };
    }, [motion]);

    useEffect(() => {
        if (lastEvent && lastEvent.type === ClientEvents.MESSAGE) {
            console.log('(Client) Message', JSON.stringify(lastEvent.data));
            // 触发事件
            eventEmitter.emit('message', lastEvent.data);
        }
    }, [lastEvent]);

    return (
        <Box
            style={{
                size: {
                    offset: Vec2.create({
                        x: screenWidth * 0.3,
                        y: screenWidth * 0.05,
                    }),
                },
                backgroundColor: Vec3.create({
                    r: 0,
                    g: 0,
                    b: 0,
                }),
                backgroundOpacity: 0.5,
                anchor: Vec2.create({
                    x: 0.5,
                    y: 1,
                }),
                ...style,
            }}
        >
            <Text
                style={{
                    size: {
                        offset: Vec2.create({ x: 0, y: 0 }),
                        scale: Vec2.create({ x: 1, y: 1 }),
                    },
                    textFontSize: screenWidth / 50,
                    textColor: Vec3.create({
                        r: 255,
                        g: 255,
                        b: 255,
                    }),
                }}
            >
                {message?.content || '恭喜你发现了一个bug'}
            </Text>
        </Box>
    );
}
