import main from '@/config/locale/lng/ko/main.json'
import noti from '@/config/locale/lng/ko/notification.json'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

export const defaultNS = 'main'

i18n
    .use(initReactI18next)
    .init({
        lng: 'ko',
        debug: true,
        resources: {
            ko: {
                main: main,
                noti: noti
            }
        },
        defaultNS,
    })