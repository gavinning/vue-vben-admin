# vite-plugin-index

为指定目录下生成index.ts，在index.ts内导出该目录下所有\*.ts文件

Install

```bash
npm install vite-plugin-index -D
bun install vite-plugin-index -D
pnpm install vite-plugin-index -D
```

Usage

```ts
// vite.config.ts

import { defineConfig } from 'vite';
import createIndex from 'vite-plugin-index';

export default defineConfig({
  plugins: [
    createIndex({
      rules: [
        {
          // 可配置js|ts|tsx|jsx
          // 多个不同后缀建议单独配置
          // 这里的后缀会影响index的后缀
          glob: '**/*.ts',
          // 为src目录下的store和helper文件夹生成index.ts
          // target目录下所有*.ts文件都会被导出
          // target目录下有ts文件增加或删除，index.ts会自动更新
          target: ['store', 'helper'],
        },
      ],
    }),
  ],
});
```

Interface

```ts
interface Rule {
  /**
   * glob pattern
   * @url https://www.npmjs.com/package/glob
   */
  glob: string;
  /**
   * target folders
   */
  target: string[];
}

export interface VitePluginIndexOption {
  /**
   * src directory
   * @default src
   */
  src?: string;
  /**
   * save file ext? .eg: index.ts
   */
  ext?: boolean;

  rules: Rule[];
}
```

Example Result:

```ts
// store/index.ts
export * from './app';
export * from './user';
```
