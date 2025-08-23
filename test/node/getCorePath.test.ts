import { checkPipPackage } from '@main/getCorePath'
import { describe, expect, it } from 'vitest'

describe('getFinal2xCorePath', () => {
  it('test_getFinal2xConfig', () => {
    expect(checkPipPackage()).toEqual(false)
  })
})
