import { join } from 'node:path'

import { logError, PipeLine, remote, Task } from 'airport2'

import { version } from './package.json'

const name = 'admin'
const file = `${[name, version].join('-')}.tgz`

// 创建部署任务
const deployTask = new Task({
  name: '部署应用',
  steps: [
    {
      name: '打包项目',
      run: [
        // 需将默认的vite.mode修改为dev或其他
        // 避免development环境变量覆盖
        'npm run build',
        'mkdir -p .cache',
        `mv \`npm pack\` .cache/${file}`,
      ],
    },
    {
      name: '发布到远程服务器',
      skip: false,
      async run() {
        const ssh = remote('root@g2.xinhaolaile.top')
        const dir = (path?: string) => join('/data/app/sky', name, path ?? '')
        try {
          await ssh.run('rm -f', dir('latest'))
          await ssh.run('mkdir -p', dir(version))
          await ssh.scp(`.cache/${file}`, dir())
          await ssh.run('tar -zxvf', dir(file), '-C', dir(version))
          await ssh.run('ln -s', dir(version), dir('latest'))
          await ssh.run('rm -f', dir(file))
        } catch (error) {
          logError(error)
        }
      },
    },
  ],
})

PipeLine.run([deployTask])
