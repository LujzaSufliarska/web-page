import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import enNavbar from './locales/en/navbar.json';
import enHome from './locales/en/home.json';
import enAbout from './locales/en/about.json';
import enExperience from './locales/en/experience.json';
import enTestimonials from './locales/en/testimonials.json';
import enProjects from './locales/en/projects.json';
import enContact from './locales/en/contact.json';
import enFooter from './locales/en/footer.json';

import skNavbar from './locales/sk/navbar.json';
import skHome from './locales/sk/home.json';
import skAbout from './locales/sk/about.json';
import skExperience from './locales/sk/experience.json';
import skTestimonials from './locales/sk/testimonials.json';
import skProjects from './locales/sk/projects.json';
import skContact from './locales/sk/contact.json';
import skFooter from './locales/sk/footer.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        navbar: enNavbar,
        home: enHome,
        about: enAbout,
        experience: enExperience,
        testimonials: enTestimonials,
        projects: enProjects,
        contact: enContact,
        footer: enFooter
      },
      sk: {
        navbar: skNavbar,
        home: skHome,
        about: skAbout,
        experience: skExperience,
        testimonials: skTestimonials,
        projects: skProjects,
        contact: skContact,
        footer: skFooter
      }
    },
    fallbackLng: "en",
    ns: ['navbar', 'home', 'about', 'experience', 'testimonials', 'projects', 'contact', 'footer'], // namespaces for the translation files
    defaultNS: 'home',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
