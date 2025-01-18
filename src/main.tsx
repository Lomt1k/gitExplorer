import 'normalize.css';
import App from './core/App.tsx';
import AntConfig from './AntConfig.ts';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ConfigProvider } from 'antd';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider theme={AntConfig} >
      <App />
    </ConfigProvider>
  </StrictMode>,
)
