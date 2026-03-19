import * as ReactDOM from 'react-dom/client';
import { init } from '@telegram-apps/sdk-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './app/App';

init();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
