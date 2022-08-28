import ReactDOM from 'react-dom/client';

import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css'
import i18next from 'i18next';
import sources from './locale';
import { LocaleProvider } from './context';

const start = async () => {
  const t = await i18next.init({ resources: sources }, (error, t) => {
    if (error) {
      console.error(error)
    }
  })
  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
  );

  root.render(
    <LocaleProvider t={t}>
      <App />
    </LocaleProvider>
  );
}

start()

