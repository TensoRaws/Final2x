import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    projects: [
      {
        plugins: [tsconfigPaths()],
        test: {
          name: 'web',
          root: 'test/web',
          include: ['**/*.test.ts'],
          environment: 'jsdom',
        },
      },
      {
        plugins: [tsconfigPaths()],
        test: {
          name: 'node',
          root: 'test/node',
          include: ['**/*.test.ts'],
          environment: 'node',
        },
      },
    ],
  },
})
