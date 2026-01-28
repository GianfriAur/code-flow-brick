import {NotificationPlugin} from "./notification-plugin";
import type {ReactArea2D} from 'rete-react-plugin';

declare module "rete" {
    interface NodeEditor {
        notificator?: NotificationPlugin;
    }
}
type AreaExtra = ReactArea2D<Schemes>;
