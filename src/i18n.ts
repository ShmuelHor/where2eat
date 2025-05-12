import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: {
            title: "🥗 What's for lunch today?",
            subtitle: "Let fate decide your daily spot!",
            todayChoice: "Today's Choice:",
            weekend: "💤 It's weekend – take a break!",
            yummy: "Yummy!",
            changeLang: "עברית",
            weekSchedule: "🗓️ Weekly Schedule",
            sunday: "Sunday",
            monday: "Monday",
            tuesday: "Tuesday",
            wednesday: "Wednesday",
            thursday: "Thursday",
            goldis: "Goldis ",
            burger: "Burger",
            halawla: "Halawla ",
            iwa: "Iwa",
            hummus: "Hummus",
        },
    },
    he: {
        translation: {
            title: "🥗 מה אוכלים היום?",
            subtitle: "תן למזל להחליט איפה תאכל!",
            todayChoice: "הבחירה של היום:",
            weekend: "💤 זה סופ\"ש – קח הפסקה!",
            yummy: "טעים!",
            changeLang: "English",
            weekSchedule: "🗓️ לוח לשבוע הקרוב",
            sunday: "ראשון",
            monday: "שני",
            tuesday: "שלישי",
            wednesday: "רביעי",
            thursday: "חמישי",
            goldis: "גולדיס",
            burger: "המבורגר",
            halawla: "חלוולה ",
            iwa: "איווה ",
            hummus: "חומוס",
        },
    },
};

i18n.use(initReactI18next).init({
    resources,
    lng: 'he',
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
