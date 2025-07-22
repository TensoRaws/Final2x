import { dialog } from 'electron'

/**
 * @description Open a directory or file/multiple files
 * @param event The event that triggered the function
 * @param p The properties of the dialog
 */
export function openDirectory(event, p: Array<any>): void {
  dialog
    .showOpenDialog({
      properties: p,
    })
    .then((result) => {
      console.log(result)
      event.sender.send('selectedItem', result.filePaths)
    })
    .catch((err) => {
      console.log(err)
    })
}
