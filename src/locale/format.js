import { chooseLocale } from '@/locale';

const lang = chooseLocale();

// TODO: Centrilized language manager, a store system

export default (id, values) => {
  if (lang.message[id] === undefined) {
    console.warn(`Translation for id: ${id} at ${lang.lang} does not exsit`);
  }
  let message = lang.message[id] || id;
  for (const value in values) {
    if (values.hasOwnProperty(value)) {
      message = message.split(`{${value}}`).join(values[value]);
    }
  }
  return message;
};
