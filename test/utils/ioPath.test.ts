/**
 * @vitest-environment jsdom
 */

import { createPinia, setActivePinia, storeToRefs } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import { useIOPathStore } from '../../src/renderer/src/store/ioPathStore'
import IOPath from '../../src/renderer/src/utils/IOPath'

describe('iOPath', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('test_ioPath', () => {
    const { outputpath } = storeToRefs(useIOPathStore())
    // checkID
    expect(IOPath.checkID('114514')).toBe(false)
    // test inputpath
    IOPath.add('114514', 'test')
    // checkID
    expect(IOPath.checkID('114514')).toBe(true)
    expect(IOPath.getByID('114514')).toBe('test')
    IOPath.add('114514', 'test2')
    expect(IOPath.getByID('114514')).toBe('test2')

    expect(IOPath.getList()).toEqual(['test2'])

    expect(IOPath.getAllPath()).toEqual('114514 : test2\n')
    expect(IOPath.show()).toEqual('test2\n')

    IOPath.delete('114514')
    expect(IOPath.getByID('114514')).toBe('')

    expect(IOPath.isEmpty()).toBe(true)

    // test outputpath
    IOPath.setoutputpath('/test')
    expect(IOPath.getoutputpath()).toBe('/test')
    IOPath.setoutputpathManual('/test2')
    expect(IOPath.getoutputpath()).toBe('/test2')
    IOPath.setoutputpath('')
    expect(IOPath.getoutputpath()).toBe('/test2')
    outputpath.value = '' // 模拟用户手动清除outputpath
    IOPath.setoutputpath('/testWhenEmpty')
    expect(IOPath.getoutputpath()).toBe('/testWhenEmpty')
    IOPath.setoutputpathManual('/test2')

    // clear ALL
    IOPath.add('114514', 'test')
    IOPath.clearALL()
    expect(IOPath.getList()).toEqual([])
    expect(IOPath.isEmpty()).toBe(true)
    expect(IOPath.getoutputpath()).toBe('/test2')
  })
})
