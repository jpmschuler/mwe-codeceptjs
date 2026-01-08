/// <reference types='codeceptjs' />
type steps_file = typeof import('./steps_file');
type PixelmatchHelper = import('codeceptjs-pixelmatchhelper');

declare namespace CodeceptJS {
  interface SupportObject { I: I, current: any }
  interface Methods extends Playwright, PixelmatchHelper {}
  interface I extends ReturnType<steps_file>, WithTranslation<Methods> {}
  namespace Translation {
    interface Actions {}
  }
}
