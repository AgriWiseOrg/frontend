import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import About from './About';
import { LanguageProvider } from './LanguageContext';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: { changeLanguage: vi.fn() }
  })
}));

describe('About Component Snapshot', () => {
  it('matches the previous snapshot perfectly', () => {
    const { container } = render(
      <BrowserRouter>
        <LanguageProvider>
          <About />
        </LanguageProvider>
      </BrowserRouter>
    );
    
    expect(container).toMatchSnapshot();
  });
});
