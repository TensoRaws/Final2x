import { checkPipPackage } from '@main/getCorePath'
import { describe, expect, it } from 'vitest'

describe('getFinal2xCorePath', () => {
  it('checkPipPackage should return false when the pip package is not available', () => {
    expect(checkPipPackage()).toEqual(false)
  })
})
