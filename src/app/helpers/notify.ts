import { Subject } from 'rxjs';
import { localStorageSignal } from './signal';

export const canSendNotifications = localStorageSignal<boolean>(
  'canSendNotifications',
  true,
);

function isPageVisible(): boolean {
  return !document.hidden;
}

type NotificationCategory = 'Error' | 'Success' | 'Travel' | 'LocationClaim';

const notification = new Subject<{
  message: string;
  type: 'show' | 'error' | 'success' | 'warning';
  category: NotificationCategory;
}>();
export const notification$ = notification.asObservable();

export function notify(message: string, category: NotificationCategory): void {
  if (!isPageVisible() || !canSendNotifications()) return;
  notification.next({ message, type: 'show', category });
}

export function notifyError(message: string): void {
  if (!isPageVisible()) return;
  notification.next({ message, type: 'error', category: 'Error' });
}

export function notifySuccess(message: string): void {
  if (!isPageVisible()) return;
  notification.next({ message, type: 'success', category: 'Success' });
}
