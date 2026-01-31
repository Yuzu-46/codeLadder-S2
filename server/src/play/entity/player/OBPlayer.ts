import { FactoryToken } from '../../../framework/common/factory/AbstractFactory';
import { PlayerType } from '../../const/TokenConst';
import { BasePlayer } from './BasePlayer';
/**
 * 观众不参与游戏，只观看
 */
@FactoryToken(PlayerType.OBPlayer)
export class OBPlayer extends BasePlayer {
    constructor() {
        super();
    }

    public start(): void {
        super.start();
        console.log('(Server) OBPlayer start');
    }

    public update(delta: number): void {
        super.update(delta);
    }

    protected btnPressAction0(event: GameInputEvent): void {
        super.btnPressAction0(event);
        console.log('(Server) OBPlayer btnPressAction0');
    }
}
