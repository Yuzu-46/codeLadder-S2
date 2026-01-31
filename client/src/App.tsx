import '@root/i18n';
import i18n from '@root/i18n';
import { Singleton } from './framework/common/Singleton';
import { RemoteMgr } from './play/mgr/RemoteMgr';
import { UIMgr } from './play/mgr/UIMgr';
import type { Language } from '../../shares/data/Language';
import { ServerEvents } from '../../shares/App';

export default class App extends Singleton<App>() {
    constructor() {
        super();
    }

    /** 远程管理器 / Remote manager */
    private _remoteMgr: RemoteMgr = RemoteMgr.instance;
    /** UI管理器 / UI manager */
    private _uiMgr: UIMgr = UIMgr.instance;

    public start(mapId: number | string = ''): void {
        console.log('(Client) Hello World!');
        // 当前i18n配置已支持语言自动切换，客户端下默认会跟随用户浏览器语言设置。例如，若用户浏览器语言为 zh-CN，则界面将显示为简体中文。
        console.log('(client)：', i18n.t('welcome_game'));
        console.log('(client)：', i18n.t('welcome_ap'));
        console.log(
            '(client)：',
            i18n.t('navigator.language', { language: navigator.language })
        );

        this._remoteMgr.start();
        this._uiMgr.start();

        this._remoteMgr.send<Language>({
            type: ServerEvents.LANGUAGE,
            data: {
                lng: navigator.language,
            },
        });

        // 定时清除控制台输出
        setInterval(() => {
            console.clear();
        }, 1000 * 30);
    }
}
