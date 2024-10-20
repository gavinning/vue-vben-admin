import { defineOverridesPreferences } from '@vben/preferences'

/**
 * @description 项目配置文件
 * 只需要覆盖项目中的一部分配置，不需要的配置不用覆盖，会自动使用默认配置
 */
export const overridesPreferences = defineOverridesPreferences({
  // overrides
  app: {
    locale: 'zh-CN',
    name: import.meta.env.VITE_APP_TITLE,
  },
  copyright: {
    enable: true,
    companyName: '测试项目',
    companySiteLink: 'javascript:void(0)',
    date: '2024',
    icp: '',
    icpLink: '',
  },
  widget: {
    globalSearch: false, // 是否显示全局搜索
    languageToggle: false, // 是否显示语言切换
  },
})
