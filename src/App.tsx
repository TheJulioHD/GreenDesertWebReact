import { BrowserRouter } from 'react-router-dom'
import {RouterApp} from './Routers';
import {AppTheme} from './Theme/AppTheme';
import {initializeApp} from 'firebase/app';
import { config } from './fireabase/firabase';

initializeApp(config.firebaseConfig)

export const App = () => {
  return (
      
      <BrowserRouter>
        <AppTheme>
          <RouterApp/>
        </AppTheme>
      </BrowserRouter>
    
  )
}
