import i18n from '@root/i18n';
import { Singleton } from './framework/common/Singleton';
import { PlayerMgr } from './play/mgr/PlayerMgr';
import { PlayerDataMgr } from './play/mgr/PlayerDataMgr';
import { RemoteMgr } from './play/mgr/RemoteMgr';

export class App extends Singleton<App>() {
    /** 玩家管理器 / Player manager */
    private _playerMgr: PlayerMgr = PlayerMgr.instance;
    /** 玩家数据管理器 / Player data manager */
    private _playerDataMgr: PlayerDataMgr = PlayerDataMgr.instance;
    /** 远程管理器 / Remote manager */
    private _remoteMgr: RemoteMgr = RemoteMgr.instance;

    /**
     * 应用程序启动方法 / Application start method
     * @param id 地图ID / Map ID
     */
    public start(id: number | string = ''): void {
        console.log('(server) Hello World!');
        // 由于服务端中用户群体广泛，来源多样，建议在每个 t 函数中显式传入当前用户的语言标识，以确保多语言内容能够正确匹配用户所需的语言版本。
        console.log('(server)：', i18n.t('welcome_game', { lng: 'zh-CN' }));
        console.log('(server)：', i18n.t('welcome_ap', { lng: 'en' }));
        this._playerMgr.start();
        this._remoteMgr.start();
    }
}
