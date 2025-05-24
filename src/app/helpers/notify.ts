import { signal } from '@angular/core';
import { Subject } from 'rxjs';

export const canSendNotifications = signal<boolean>(true);

type NotificationCategory = 'Error' | 'Success' | 'Travel' | 'LocationClaim';

const notification = new Subject<{
  message: string;
  type: 'show' | 'error' | 'success' | 'warning';
  category: NotificationCategory;
}>();
export const notification$ = notification.asObservable();

export function notify(message: string, category: NotificationCategory): void {
  if (!canSendNotifications()) return;
  notification.next({ message, type: 'show', category });
}

export function notifyError(message: string): void {
  if (!canSendNotifications()) return;
  notification.next({ message, type: 'error', category: 'Error' });
}

export function notifySuccess(message: string): void {
  if (!canSendNotifications()) return;
  notification.next({ message, type: 'success', category: 'Success' });
}
