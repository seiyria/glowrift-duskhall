import { signal, WritableSignal } from '@angular/core';
import { VersionInfo } from '../interfaces';

export const localVersion: WritableSignal<VersionInfo | undefined> =
  signal(undefined);
export const liveVersion: WritableSignal<VersionInfo | undefined> =
  signal(undefined);

export function versionInfoToSemver(versionInfo: VersionInfo) {
  if (versionInfo.distance >= 0 && versionInfo.tag) {
    return `${versionInfo.tag} (${versionInfo.raw})`;
  }

  return (
    versionInfo.tag ||
    versionInfo.semverString ||
    versionInfo.raw ||
    versionInfo.hash
  );
}
