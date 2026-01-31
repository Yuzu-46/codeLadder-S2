/// <reference types="vite/client" />

/**
 * 环境变量，可在代码中使用import.meta.env.* 获取
 */
interface ImportMetaEnv {
  /**
   * 当前要构建 / 上传的 bundle 名，对应 dao3.config.ts -> bundles 的 key。
   * 为空时表示构建并上传所有启用的 bundle（多入口）。
   */
  readonly VITE_CURRENT_FILE: string;

  /**
   * 脚本要上传的目标地图ID，必须为「扩展地图」类型
   */
  readonly VITE_DAO3_MAP_ID: string;
}
