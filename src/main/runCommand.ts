import { spawn } from 'node:child_process'
import kill from 'tree-kill'

import { getCorePath } from './getCorePath'

let child

export async function runCommand(
  event,
  config_json: string,
  openOutputFolder: boolean,
): Promise<void> {
  // ---- 还是直接传base64吧
  // config_json = JSON.stringify(config_json) // 转义转义
  // ----
  // eslint-disable-next-line node/prefer-global/buffer
  config_json = Buffer.from(config_json, 'utf8').toString('base64')

  const resourceUrl = getCorePath()

  let command = `"${resourceUrl}" -b ${config_json}`

  if (!openOutputFolder) {
    command += ' -n'
  }

  console.log(command)

  child = spawn(command, { shell: true })

  child.stdout.on('data', (data) => {
    event.sender.send('command-stdout', data.toString())
  })

  child.stderr.on('data', (data) => {
    event.sender.send('command-stderr', data.toString())
  })

  child.on('close', (code) => {
    event.sender.send('command-close-code', code)
  })
}

export async function killCommand(): Promise<void> {
  if (!child || !child.pid) {
    return
  }

  console.log(`Kill child process with pid: ${child.pid}`)

  await new Promise<void>((resolve) => {
    kill(child.pid, (err) => {
      if (err) {
        console.error(`Failed to kill process: ${err.message}`)
      }
      else {
        console.log('Process killed successfully')
      }
      resolve()
    })
  })

  child = null
}
