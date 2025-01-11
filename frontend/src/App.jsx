import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './store';
import Layouts from './layouts';
 
 
function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter >
            <Layouts />
        </BrowserRouter>
      </Provider>
    </div>
  );
}
 
export default App;
 