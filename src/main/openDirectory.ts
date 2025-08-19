import { dialog } from 'electron'

/**
 * @description Open a directory or file/multiple files
 * @param _ Unused parameter, can be used for context in future
 * @param p The properties of the dialog
 */
export async function openDirectory(_, p: Array<'openFile' | 'openDirectory' | 'multiSelections'>): Promise<Array<string>> {
  try {
    const { canceled, filePaths } = await dialog.showOpenDialog({ properties: p })
    return canceled ? [] : filePaths
  }
  catch (error) {
    console.error('Error opening directory dialog:', error)
    return []
  }
}
