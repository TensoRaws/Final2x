/**
 * 渲染进程 → 主进程（invoke/handle）
 */
export enum IpcChannelInvoke {
  OPEN_DIRECTORY_DIALOG = 'ipc:open-directory-dialog',
}

/**
 * 渲染进程 → 主进程（send/on，单向）
 */
export enum IpcChannelSend {
  EXECUTE_COMMAND = 'ipc:send:execute-command',
  KILL_COMMAND = 'ipc:send:kill-command',
  MINIMIZE = 'ipc:send:minimize',
  MAXIMIZE = 'ipc:send:maximize',
  CLOSE = 'ipc:send:close',
}

/**
 * 主进程 → 渲染进程（send/on，主进程主动 emit）
 */
export enum IpcChannelOn {
  COMMAND_STDOUT = 'ipc:on:command-stdout',
  COMMAND_STDERR = 'ipc:on:command-stderr',
  COMMAND_CLOSE = 'ipc:on:command-close-code',
}
