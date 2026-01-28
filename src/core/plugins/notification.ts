import {type BaseSchemes, Scope} from "rete";
import {AreaPlugin} from "rete-area-plugin";

type NotificationType = 'error' | 'warning' | 'success' | 'info';

interface Notification {
    id: string;
    type: NotificationType;
    message: string;
    duration?: number;
    timestamp: number;
}

export class NotificationPlugin<Schemes extends BaseSchemes> extends Scope<never, [AreaPlugin<Schemes, any>]> {
    private notifications: Notification[] = [];
    private container?: HTMLElement;
    private notificationElements = new Map<string, HTMLElement>();

    constructor() {
        super("notification");
    }

    setParent(scope: Scope<AreaPlugin<Schemes, any>, []>): void {
        super.setParent(scope);
        this.createContainer();
    }

    private createContainer() {
        const area = this.parentScope();
        if (!area) return;
        const areaContainer = (area as any).container as HTMLElement;

        this.container = document.createElement('div');
        this.container.className = 'rete-notifications';
        this.container.style.cssText = `
            position: absolute;
            bottom: 20px;
            right: 20px;
            z-index: 10000;
            display: flex;
            flex-direction: column-reverse;
            gap: 12px;
            pointer-events: none;
            max-width: 400px;
        `;

        areaContainer.appendChild(this.container);
    }

    notify(type: NotificationType, message: string, duration: number = 3000): string {
        const id = Math.random().toString(36).substr(2, 9);
        const notification: Notification = {
            id,
            type,
            message,
            duration,
            timestamp: Date.now()
        };

        this.notifications.push(notification);
        this.renderNotification(notification);

        if (duration > 0) {
            setTimeout(() => this.remove(id), duration);
        }

        return id;
    }

    error(message: string, duration?: number): string {
        return this.notify('error', message, duration);
    }

    warning(message: string, duration?: number): string {
        return this.notify('warning', message, duration);
    }

    success(message: string, duration?: number): string {
        return this.notify('success', message, duration);
    }

    info(message: string, duration?: number): string {
        return this.notify('info', message, duration);
    }

    private renderNotification(notification: Notification) {
        if (!this.container) return;

        const element = document.createElement('div');
        element.className = `rete-notification rete-notification-${notification.type}`;
        element.style.cssText = `
            padding: 16px 20px;
            border-radius: 12px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08);
            pointer-events: auto;
            cursor: pointer;
            animation: code-flow-brick-slideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            font-size: 14px;
            backdrop-filter: blur(8px);
            border: 1px solid;
            width: 100%;
        `;

        const colors = {
            error: {
                bg: 'linear-gradient(135deg, rgba(254, 226, 226, 0.95) 0%, rgba(252, 231, 243, 0.95) 100%)',
                border: 'rgba(239, 68, 68, 0.3)',
                color: '#991b1b'
            },
            warning: {
                bg: 'linear-gradient(135deg, rgba(254, 243, 199, 0.95) 0%, rgba(253, 230, 138, 0.95) 100%)',
                border: 'rgba(245, 158, 11, 0.3)',
                color: '#92400e'
            },
            success: {
                bg: 'linear-gradient(135deg, rgba(209, 250, 229, 0.95) 0%, rgba(167, 243, 208, 0.95) 100%)',
                border: 'rgba(16, 185, 129, 0.3)',
                color: '#065f46'
            },
            info: {
                bg: 'linear-gradient(135deg, rgba(219, 234, 254, 0.95) 0%, rgba(191, 219, 254, 0.95) 100%)',
                border: 'rgba(59, 130, 246, 0.3)',
                color: '#1e40af'
            }
        };

        const color = colors[notification.type];
        element.style.background = color.bg;
        element.style.borderColor = color.border;
        element.style.color = color.color;

        element.innerHTML = `
            <div style="display: flex; align-items: flex-start; gap: 12px;">

                <div style="flex: 1; min-width: 0;">
                    <div style="
                        font-weight: 600; 
                        line-height: 1.5;
                        word-wrap: break-word;
                        overflow-wrap: break-word;
                    ">${this.escapeHtml(notification.message)}</div>
                </div>
                <button class="close-btn" style="
                    background: rgba(0, 0, 0, 0.05);
                    border: none;
                    cursor: pointer;
                    font-size: 18px;
                    color: currentColor;
                    opacity: 0.5;
                    padding: 4px;
                    line-height: 1;
                    width: 24px;
                    height: 24px;
                    flex-shrink: 0;
                    border-radius: 6px;
                    transition: all 0.2s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-top: -2px;
                ">×</button>
            </div>
        `;

        const closeBtn = element.querySelector('.close-btn') as HTMLButtonElement;
        if (closeBtn) {
            closeBtn.addEventListener('mouseenter', () => {
                closeBtn.style.opacity = '1';
                closeBtn.style.background = 'rgba(0, 0, 0, 0.1)';
                closeBtn.style.transform = 'scale(1.1)';
            });
            closeBtn.addEventListener('mouseleave', () => {
                closeBtn.style.opacity = '0.5';
                closeBtn.style.background = 'rgba(0, 0, 0, 0.05)';
                closeBtn.style.transform = 'scale(1)';
            });
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.remove(notification.id);
            });
        }

        element.addEventListener('mouseenter', () => {
            element.style.transform = 'translateY(-2px)';
            element.style.boxShadow = '0 12px 32px rgba(0, 0, 0, 0.16), 0 4px 12px rgba(0, 0, 0, 0.12)';
        });

        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translateY(0)';
            element.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08)';
        });

        this.container.appendChild(element);
        this.notificationElements.set(notification.id, element);
    }

    private escapeHtml(text: string): string {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    remove(id: string) {
        const element = this.notificationElements.get(id);
        if (element) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px) scale(0.95)';
            setTimeout(() => {
                element.remove();
                this.notificationElements.delete(id);
            }, 300);
        }

        this.notifications = this.notifications.filter(n => n.id !== id);
    }

    clear() {
        this.notifications.forEach(n => this.remove(n.id));
    }

    public destroy(): void {
        this.clear();
        this.container?.remove();
    }
}

// CSS Animation
if (!document.querySelector('#rete-notification-styles')) {
    const style = document.createElement('style');
    style.id = 'rete-notification-styles';
    style.textContent = `
        @keyframes code-flow-brick-slideIn {
            from {
                transform: translateY(100%) scale(0.95);
                opacity: 0;
            }
            to {
                transform: translateY(0) scale(1);
                opacity: 1;
            }
        }
        
        .rete-notification:hover {
            cursor: pointer;
        }
    `;
    document.head.appendChild(style);
}
