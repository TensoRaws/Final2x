import { storeToRefs } from 'pinia'
import { useIOPathStore } from '../store/ioPathStore'
import PathFormat from '../utils/pathFormat'

class ioPath {
  /**
   * @description Add a new inputpath to inputpathMap
   * @param id inputpath id
   * @param path inputpath
   */
  static add(id: string, path: string): void {
    const { inputpathMap } = storeToRefs(useIOPathStore())
    if (path !== '') {
      inputpathMap.value.set(id, path)
    }
  }

  /**
   * @description Delete an inputpath from inputpathMap by id
   * @param id inputpath id
   */
  static delete(id: string): void {
    const { inputpathMap } = storeToRefs(useIOPathStore())
    inputpathMap.value.delete(id)
  }

  /**
   * @description 检查 id 是否存在，因为 naive-ui 生成的 id 长度较短，所以这里只检查 inputpathMap 即可
   * @param id inputpath id
   */
  static checkID(id: string): boolean {
    const { inputpathMap } = storeToRefs(useIOPathStore())
    return inputpathMap.value.get(id) !== undefined
  }

  /**
   * @description Get an inputpath from inputpathMap by id
   * @param id inputpath id
   */
  static getByID(id: string): string {
    const { inputpathMap } = storeToRefs(useIOPathStore())
    return inputpathMap.value.get(id) || ''
  }

  /**
   * @description Get all inputpath from inputpathMap
   * @returns inputpathMap with string
   */
  static getAllPath(): string {
    const { inputpathMap } = storeToRefs(useIOPathStore())
    // return inputpath key and value with string
    let inputpath = ''
    inputpathMap.value.forEach((value, key) => {
      inputpath += `${key} : ${value}\n`
    })
    return inputpath
  }

  /**
   * @description Get all inputpath from inputpathMap
   * @returns inputpathMap string list
   */
  static getList(): string[] {
    const { inputpathMap } = storeToRefs(useIOPathStore())
    // return inputpath value with String List
    return Array.from(inputpathMap.value.values())
  }

  /**
   * @description check inputpathMap is empty
   */
  static isEmpty(): boolean {
    const { inputpathMap } = storeToRefs(useIOPathStore())
    return inputpathMap.value.size === 0
  }

  /**
   * @description Get all inputpath from inputpathMap
   * @returns inputpathMap with string
   */
  static show(): string {
    const inputpathList = ioPath.getList()
    console.log('inputpathList: ', inputpathList)
    let inputpathListString = ''
    for (const i in inputpathList) {
      inputpathListString += `${inputpathList[i]}\n`
    }
    return inputpathListString
  }

  /**
   * @description Set outputpath by manual, and lock outputpath
   */
  static setoutputpathManual(path: string): void {
    const { outputpath, outputpathLock } = storeToRefs(useIOPathStore())
    if (path !== '') {
      outputpath.value = path
      outputpathLock.value = true
      console.log('outputpath SET SUCCESS!')
    }
  }

  /**
   * @description Set outputpath if outputpathLock is false or outputpath is invalid
   */
  static setoutputpath(path: string): void {
    const { outputpath, outputpathLock } = storeToRefs(useIOPathStore())
    // if outputpathLock is false or outputpath is empty, set outputpath
    if (path !== '' && (outputpathLock.value === false || !PathFormat.checkPath(outputpath.value))) {
      outputpath.value = path
    }
    else {
      console.log('outputpath Lock!')
    }
  }

  /**
   * @description get outputpath
   */
  static getoutputpath(): string {
    const { outputpath } = storeToRefs(useIOPathStore())
    return outputpath.value
  }

  /**
   * @description clear all inputpath
   */
  static clearALL(): void {
    const { inputpathMap, inputFileList } = storeToRefs(useIOPathStore())
    inputpathMap.value.clear()
    inputFileList.value = []
  }
}

export default ioPath
