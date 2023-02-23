import { BrowserRouter } from 'react-router-dom'
import {RouterApp} from './Routers';
import {AppTheme} from './Theme/AppTheme';


export const App = () => {
  return (
    <BrowserRouter>
      <AppTheme>
        <RouterApp/>
      </AppTheme>
    </BrowserRouter>
  )
}
