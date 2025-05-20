export interface VersionInfo {
  dirty: boolean;
  raw: string;
  hash: string;
  distance: number;
  tag: string;
  semver: string;
  suffix: string;
  semverString: string;
}
