/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatDate } from '@angular/common';
import { ErrorHandler, inject, Injectable, signal } from '@angular/core';
import { color } from 'console-log-colors';
import { cloneDeep } from 'lodash';
import Rollbar from 'rollbar';
import { environment } from '../../environments/environment';
import { localVersion, versionInfoToSemver } from '../helpers';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  private rollbar!: Rollbar;

  private readonly ignoredMessageSubstrings: string[] = [
    'Failed to fetch dynamically imported module',
    'is not valid JSON',
    'Script error',
    'jQuery',
    'The object is in an invalid state.',
    '$0',
    'NG0950',
    'hotToastComponentList',
  ];

  private lastId = signal<string>('');

  constructor() {}

  init() {
    if (environment.rollbar.accessToken) {
      const rollbarConfig = cloneDeep(environment.rollbar);

      const realVersion = localVersion();
      if (realVersion) {
        rollbarConfig.payload.client.javascript.code_version =
          versionInfoToSemver(realVersion) ?? 'unknown';
      }

      this.rollbar = new Rollbar({
        ...rollbarConfig,
        checkIgnore: (uncaught, args) => {
          const argMessage = args[0]?.toString() ?? '';
          return this.ignoredMessageSubstrings.some((msg) =>
            argMessage.includes(msg),
          );
        },
      });
    }
  }

  private _logMessage(
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
    const colorFunc = color[colors[level]] as unknown as (
      str: string,
    ) => string;

    const timestamp = formatDate(new Date(), 'medium', 'en-US');
    console[level](colorFunc(`[${timestamp}] {${category}}`), ...data);
  }

  public log(category: string, ...data: any) {
    this._logMessage('log', category, ...data);
  }

  public info(category: string, ...data: any) {
    this._logMessage('info', category, ...data);
  }

  public warn(category: string, ...data: any) {
    this._logMessage('warn', category, ...data);
  }

  public debug(category: string, ...data: any) {
    this._logMessage('debug', category, ...data);
  }

  public error(category: string, ...data: any) {
    this._logMessage('error', category, ...data);
  }

  public rollbarError(error: any) {
    this.rollbar?.error(error.originalError || error);
  }

  public setUserInformation(id: string, username: string): void {
    if (id === this.lastId()) return;

    this.rollbar?.configure({
      payload: {
        person: {
          id,
          username,
        },
      },
    });

    this.lastId.set(id);
  }
}

@Injectable()
export class RollbarErrorHandler implements ErrorHandler {
  private logger = inject(LoggerService);

  handleError(error: any) {
    this.logger.error(error);
    this.logger.rollbarError(error);
  }
}
