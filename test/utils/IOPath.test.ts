/**
 * @vitest-environment jsdom
 */

import { createPinia, setActivePinia, storeToRefs } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import { useIOPathStore } from '../../src/renderer/src/store/ioPathStore'
import ioPath from '../../src/renderer/src/utils/IOPath'

describe('iOPath', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('test_ioPath', () => {
    const { outputpath } = storeToRefs(useIOPathStore())
    // checkID
    expect(ioPath.checkID('114514')).toBe(false)
    // test inputpath
    ioPath.add('114514', 'test')
    // checkID
    expect(ioPath.checkID('114514')).toBe(true)
    expect(ioPath.getByID('114514')).toBe('test')
    ioPath.add('114514', 'test2')
    expect(ioPath.getByID('114514')).toBe('test2')

    expect(ioPath.getList()).toEqual(['test2'])

    expect(ioPath.getAllPath()).toEqual('114514 : test2\n')
    expect(ioPath.show()).toEqual('test2\n')

    ioPath.delete('114514')
    expect(ioPath.getByID('114514')).toBe('')

    expect(ioPath.isEmpty()).toBe(true)

    // test outputpath
    ioPath.setoutputpath('/test')
    expect(ioPath.getoutputpath()).toBe('/test')
    ioPath.setoutputpathManual('/test2')
    expect(ioPath.getoutputpath()).toBe('/test2')
    ioPath.setoutputpath('')
    expect(ioPath.getoutputpath()).toBe('/test2')
    outputpath.value = '' // 模拟用户手动清除outputpath
    ioPath.setoutputpath('/testWhenEmpty')
    expect(ioPath.getoutputpath()).toBe('/testWhenEmpty')
    ioPath.setoutputpathManual('/test2')

    // clear ALL
    ioPath.add('114514', 'test')
    ioPath.clearALL()
    expect(ioPath.getList()).toEqual([])
    expect(ioPath.isEmpty()).toBe(true)
    expect(ioPath.getoutputpath()).toBe('/test2')
  })
})
