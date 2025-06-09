/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatDate } from '@angular/common';
import { color } from 'console-log-colors';

export function _logMessage(
  level: 'debug' | 'error' | 'log' | 'info' | 'warn',
  category: string,
  ...data: any
) {
  const colors: Record<typeof level, keyof typeof color> = {
    debug: 'gray',
    error: 'red',
    log: 'magenta',
    warn: 'yellow',
    info: 'blue',
  };
  const colorFunc = color[colors[level]] as unknown as (str: string) => string;

  const timestamp = formatDate(new Date(), 'medium', 'en-US');
  console[level](colorFunc(`[${timestamp}] {${category}}`), ...data);
}

export function log(category: string, ...data: any) {
  _logMessage('log', category, ...data);
}

export function info(category: string, ...data: any) {
  _logMessage('info', category, ...data);
}

export function warn(category: string, ...data: any) {
  _logMessage('warn', category, ...data);
}

export function debug(category: string, ...data: any) {
  _logMessage('debug', category, ...data);
}

export function error(category: string, ...data: any) {
  _logMessage('error', category, ...data);
}
