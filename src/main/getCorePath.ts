import { spawnSync } from 'child_process'
import path from 'path'
import { app } from 'electron'

const FINAL2X_CORE_NAME = 'Final2x-core'
const FINAL2X_CORE_PATH = '/Final2x-core/Final2x-core'

/**
 * 获取 Final2x-core 的路径
 * dev模式下，存放在项目根目录下的 resources
 * 在 electron-builder 中配置 extraResources，ASAR 打包时将它放入 app.asar 同级目录
 * @returns {string} Final2x-core 的路径
 */
export function GetCorePath(): string {
  if (!CheckPipPackage()) {
    if (process.env.NODE_ENV === 'development') {
      return path.join(app.getAppPath(), 'resources', FINAL2X_CORE_PATH)
    } else {
      return path.join(app.getAppPath(), '..', FINAL2X_CORE_PATH)
    }
  } else {
    return FINAL2X_CORE_NAME
  }
}

function CheckPipPackage(): boolean {
  const command = FINAL2X_CORE_NAME + ' -h'

  const result = spawnSync(command, { shell: true, encoding: 'utf-8' })

  return result.status === 0
}
