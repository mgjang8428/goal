import type { Preview } from '@storybook/react-vite';
import { Suspense, useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../src/config/locale/i18n';
import '../src/index.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  },

  decorators: [
    (Story, context) => {

      const { locale } = context.globals

      useEffect(() => {
        i18n.changeLanguage(locale)
      }, [locale])

      return (
        <Suspense fallback={<div>loading translations...</div>}>
          <I18nextProvider i18n={i18n}>
            <Story />
          </I18nextProvider>
        </Suspense>
      )
    }
  ]
};

// Create a global variable called locale in storybook
// and add a menu in the toolbar to change your locale
export const globalTypes = {
  locale: {
    name: 'Locale',
    description: 'Internationalization locale',
    toolbar: {
      icon: 'globe',
      items: [
        { value: 'ko', title: 'Korean' },
        { value: 'en', title: 'English' },
      ],
      showName: true,
    },
  },
};

export default preview;