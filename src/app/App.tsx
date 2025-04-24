import { Provider } from 'react-redux';
import { AppRouter } from '@app/router/routes';
import { store } from '@app/store';
import '@app/styles/global.css';

function App() {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
}

export default App;
