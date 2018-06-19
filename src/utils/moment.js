import moment from 'moment';
import momentLocale from 'moment/locale/ja';
import { chooseLocale } from '@/locale';

moment.updateLocale(chooseLocale().lang, momentLocale);
export default moment;
