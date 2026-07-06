export interface UiUserConfig {
  componentsDir?: string;
  tokens?: boolean;
}

export interface UiResolvedConfig {
  componentsDir: string;
  configPath: string | null;
  tokens: boolean;
}
