import './App.css';
import ComposePanel from './pages/ComposePanel';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Footer from './pages/components/Footer/Footer';
import Header from './pages/components/Header/Header';
import SetupLinePage from './pages/SetupLine/SetupLine';
import ActivationComplete from './pages/ActivationComplete/ActivationComplete';
import ReviewYourPhoneNumberPage from './pages/ReviewYourPhoneNumber/ReviewYourPhoneNumberPage';
import TransferYourPhonePage from './pages/TransferYourPhone/TransferYourPhone';
import TagManager from 'react-gtm-module'

const tagManagerArgs = {
  gtmId: 'GTM-MX5HTF2'
}
TagManager.initialize(tagManagerArgs)

function App() {
  TagManager.dataLayer({ dataLayer: { event: 'event_name' } })

  const router = createBrowserRouter([
    {
      path: '/setup',
      element: <SetupLinePage/>
    },
    {
      path: '/',
      element: <TransferYourPhonePage/>
    },
   {
     path: '/review-phone-number',
     element: <ReviewYourPhoneNumberPage/>
   }, 
    {
      path: "/compose",
      element: <ComposePanel title="Page 1" pageId='page1'/>
    },
    {
      path: "/activation",
      element: <ActivationComplete/>
    },
    {
      path: "redirection",
      element: <div>Redirection should happen here</div>
    }
  ], {
    basename: '/porting'
  })

  return (
    <div className="App">
      <Header/>
      <RouterProvider router={router}/>
      <Footer/>
    </div>
  );
}

export default App;
