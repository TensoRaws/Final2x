/**
 * @vitest-environment jsdom
 */

import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import { getFinal2xconfig } from '../../src/renderer/src/utils/getFinal2xconfig'
import IOPath from '../../src/renderer/src/utils/IOPath'

describe('getFinal2xconfig', () => {
  beforeEach(() => {
    // 创建一个新 pinia，并使其处于激活状态
    setActivePinia(createPinia())
  })

  it('test_getFinal2xconfig', () => {
    IOPath.add('114514', '/Users/Downloads/114514')
    expect(getFinal2xconfig()).toEqual(
      '{"pretrained_model_name":"RealESRGAN_RealESRGAN_x2plus_2x.pth","device":"auto","gh_proxy":null,"target_scale":null,"output_path":"/Users/Downloads","input_path":["/Users/Downloads/114514"],"use_tile":true,"save_format":".png"}',
    )
    IOPath.setoutputpath('/test')
    expect(getFinal2xconfig()).toEqual(
      '{"pretrained_model_name":"RealESRGAN_RealESRGAN_x2plus_2x.pth","device":"auto","gh_proxy":null,"target_scale":null,"output_path":"/test","input_path":["/Users/Downloads/114514"],"use_tile":true,"save_format":".png"}',
    )
    IOPath.add('114514', '/test1')
    expect(getFinal2xconfig()).toEqual(
      '{"pretrained_model_name":"RealESRGAN_RealESRGAN_x2plus_2x.pth","device":"auto","gh_proxy":null,"target_scale":null,"output_path":"/test","input_path":["/test1"],"use_tile":true,"save_format":".png"}',
    )
    IOPath.add('1919810', '/test2')
    expect(getFinal2xconfig()).toEqual(
      '{"pretrained_model_name":"RealESRGAN_RealESRGAN_x2plus_2x.pth","device":"auto","gh_proxy":null,"target_scale":null,"output_path":"/test","input_path":["/test1","/test2"],"use_tile":true,"save_format":".png"}',
    )
  })
})
