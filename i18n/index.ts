/**
 * @file i18next 实例配置文件
 * @description
 * 这个文件负责初始化 i18next 库，并将其配置为在客户端和服务端中使用。
 * 最后导出一个已配置好的 i18n 实例，供整个应用使用。
 *
 * @link https://www.i18next.com/
 */
import i18n from 'i18next';
import en_Translation from './res/en/translation.json';
import zhCN_Translation from './res/zh-CN/translation.json';

const getNavigatorLanguage = () => {
  if (
    // @ts-ignore
    typeof navigator !== 'undefined' &&
    // @ts-ignore
    typeof navigator.language === 'string' &&
    // @ts-ignore
    navigator.language
  ) {
    // @ts-ignore
    return navigator.language;
  }
  return 'zh-CN';
};

i18n.init({
  lng: getNavigatorLanguage(),
  fallbackLng: 'zh-CN',
  debug: false,
  defaultNS: 'translation',
  resources: {
    en: {
      translation: en_Translation,
    },
    'zh-CN': {
      translation: zhCN_Translation,
    },
  },
  interpolation: {
    escapeValue: false,
  },
});

/**
 * @zh
 * i18next 实例
 * @en
 * i18next instance
 */
export default i18n;
