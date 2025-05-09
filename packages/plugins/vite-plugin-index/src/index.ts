import type { PluginOption } from 'vite';

import fs from 'node:fs';
import { extname } from 'node:path';
import process from 'node:process';

import merge from 'extend';
import { glob } from 'glob';
import { normalizePath } from 'vite';

type Item = Record<string, any>;

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
   * save file ext? .eg: index.ts
   */
  ext?: boolean;
  rules: Rule[];
  /**
   * src directory
   * @default src
   */
  src?: string;
}

const cwd = process.cwd();

const fileHeader = '// 该文件由vite-plugin-index自动生成，请勿手动修改\n';

class CreateIndex {
  cleanExtNames = ['.js', '.ts', '.tsx', 'jsx'];
  defaultOption = { src: 'src' };

  // 监听的文件夹
  private get targets() {
    return this.option.rules.flatMap((rule) => {
      return rule.target.map((target) =>
        this.getTargetPath(this.option.src ?? this.defaultOption.src, target),
      );
    });
  }

  constructor(private option: VitePluginIndexOption) {
    this.option = merge(true, {}, this.defaultOption, this.option);
  }

  public static create(config: VitePluginIndexOption) {
    this.init(config).createIndex();
  }

  public static init(config: VitePluginIndexOption) {
    return new CreateIndex(config);
  }

  public static rebuild(id: string, config: VitePluginIndexOption) {
    this.init(config).rebuild(id);
  }

  private createIndex() {
    return this.option.rules.map((rule) => this.getFiles(rule));
  }

  private getExpressions(paths: string[]) {
    const expressions = paths.map((path) => `export * from './${path}'`);
    expressions.unshift(fileHeader);
    return `${expressions.join('\n')}\n`;
  }

  private getFiles(rule: Rule) {
    const fileMap: Item = {};
    const index = this.getIndex(rule);

    rule.target.forEach((target) => {
      const src = this.option.src ?? this.defaultOption.src;
      // index file
      const id = this.getTargetPath(src, target, index);
      const all = glob.sync(rule.glob, {
        cwd: this.getTargetPath(src, target),
      });
      const others = all.filter((file) => file !== index);
      const expressions = this.getExpressions(
        this.removeExtName(others).sort(),
      );

      fileMap[target] = { id, files: all, expressions };

      if (fileMap[target].files.length > 0) {
        this.writeIndex(fileMap[target]);
      }
    });

    return fileMap;
  }

  private getIndex(rule: Rule) {
    return ['index', extname(rule.glob)].join('');
  }

  private getTargetPath(...paths: string[]) {
    return normalizePath([cwd, ...paths].join('/'));
  }

  private rebuild(id: string) {
    // 过滤，仅监听符合条件的文件
    if (this.targets.some((path) => id.includes(path))) {
      this.createIndex();
    }
  }

  private removeExtName(paths: string[]) {
    return paths.map((path) => {
      if (this.cleanExtNames.includes(extname(path))) {
        return path.slice(0, -extname(path).length);
      }
      return path;
    });
  }

  private removeIndex(id: string) {
    if (fs.existsSync(id)) {
      fs.unlinkSync(id);
    }
  }

  private writeIndex(task: Item) {
    const { id, expressions } = task;
    this.removeIndex(id);
    fs.writeFileSync(id, expressions);
  }
}

export default function createIndex(
  config: VitePluginIndexOption,
): PluginOption {
  return {
    name: 'vite-plugin-index',
    buildStart() {
      CreateIndex.create(config);
    },
    watchChange(id, change) {
      if (['create', 'delete'].includes(change.event)) {
        CreateIndex.rebuild(id, config);
      }
    },
  };
}
