import {getRequestConfig} from 'next-intl/server';
import {hasLocale} from 'next-intl';
import {routing} from './routing';

export default getRequestConfig(async ({requestLocale}) => {
  const requested = await requestLocale;
  
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  

  const common = (
    await import(`../messages/${locale}/common.json`)
  ).default;

  const form = (
    await import(`../messages/${locale}/form.json`)
  ).default;

  const message = (
    await import(`../messages/${locale}/message.json`)
  ).default;

  return {
    locale: locale as string,
    messages: {
      common,
      form,
      message,
    }
  };
});