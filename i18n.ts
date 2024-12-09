const cookieObj = typeof window === 'undefined' ? require('next/headers') : require('universal-cookie');

import en from './public/locales/en/index.json';
import ae from './public/locales/ae/index.json';
import da from './public/locales/da/index.json';
import de from './public/locales/de/index.json';
import el from './public/locales/el/index.json';
import es from './public/locales/es/index.json';
import fr from './public/locales/fr/index.json';
import hu from './public/locales/hu/index.json';
import it from './public/locales/it/index.json';
import ja from './public/locales/ja/index.json';
import pl from './public/locales/pl/index.json';
import pt from './public/locales/pt/index.json';
import ru from './public/locales/ru/index.json';
import sv from './public/locales/sv/index.json';
import tr from './public/locales/tr/index.json';
import zh from './public/locales/zh/index.json';
const langObj: any = { en, ae, da, de, el, es, fr, hu, it, ja, pl, pt, ru, sv, tr, zh };

const getLang = () => {
    let lang = null;
    if (typeof window !== 'undefined') {
        const cookies = new cookieObj(null, { path: '/' });
        lang = cookies.get('i18nextLng');
    } else {
        const cookies = cookieObj.cookies();
        lang = cookies.get('i18nextLng')?.value;
    }
    return lang;
};

export const getTranslation = () => {
    const lang = getLang();
    const data: any = langObj[lang || 'en'];

    const t = (key: string) => {
        return data[key] ? data[key] : key;
    };

    const initLocale = (themeLocale: string) => {
        const lang = getLang();
        i18n.changeLanguage(lang || themeLocale);
    };

    const i18n = {
        language: lang,
        changeLanguage: (lang: string) => {
            const cookies = new cookieObj(null, { path: '/' });
            cookies.set('i18nextLng', lang);
        },
    };

    return { t, i18n, initLocale };
};
