export interface ProItem {
  title: string
  desc: string
  price: string
  origin: string
  btn: string
  list: string[]
}

export interface ProData {
  title: string
  desc: string
  list: ProItem[]
}

interface Config {
  map: ProData
}

export interface ProMockData {
  code: number
  data: Config[]
}

export const proMockData = {
  code: 0,
  data: [
    {
      map: {
        title: '升级专业版',
        desc: '专业版功能更强大，支持更多功能',
        list: [
          {
            title: '初级代理',
            desc: '初级代理功能介绍',
            price: '￥39.9',
            origin: '￥99.9',
            btn: '立即升级',
            list: [
              '1-初级项目授权',
              '0-初级项目授权',
              '1-初级项目授权',
              '1-初级项目授权',
              '1-初级项目授权',
            ],
          },
          {
            title: '中级代理',
            desc: '中级代理功能介绍',
            price: '￥199',
            origin: '￥399',
            btn: '立即升级',
            list: [
              '1-中级项目授权',
              '0-中级项目授权',
              '1-中级项目授权',
              '1-中级项目授权',
              '1-中级项目授权',
            ],
          },
          {
            title: '高级代理',
            desc: '高级代理功能介绍',
            price: '￥599',
            origin: '￥999',
            btn: '立即升级',
            list: [
              '1-高级项目授权',
              '0-高级项目授权',
              '1-高级项目授权',
              '1-高级项目授权',
              '1-高级项目授权',
            ],
          },
        ],
      },
    },
  ],
}
