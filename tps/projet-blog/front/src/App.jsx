import Header from "./composants/commun/Header";
import Footer from "./composants/commun/Footer";
import Accueil from "./composants/pages/Accueil";
import Single from "./composants/pages/Single";
import Page404 from "./composants/pages/Page404";
import AdminHome from "./composants/pages/AdminHome";
import AdminAddArticle from "./composants/pages/AdminAddArticle";
import AdminUpdateArticle from "./composants/pages/AdminUpdateArticle";
import Inscription from "./composants/pages/Inscription";
import Connexion from "./composants/pages/Connexion";

import { Routes, Route} from "react-router-dom"
import { UserContextProvider } from "./context/userContext"
import Page403 from "./composants/pages/Page403";
import ScrollToTop from "./composants/commun/ScrollTop";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App(){
  return <div>
    
    <UserContextProvider>
    <Header />
      <main className="container">
      {/** routeur associer url => composant */}
      <Routes>
        <Route path="/" element={ <Accueil /> } />
        <Route path="/article/:id/:slug" element={ <Single /> } />
        <Route path="/register" element={ <Inscription /> } />
        <Route path="/login" element={ <Connexion /> } />
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/add/article" element={<AdminAddArticle />} />
        <Route path="/admin/update/article/:id" element={<AdminUpdateArticle />} />
        <Route path="/403" element={ <Page403 /> } />
        <Route path="*" element={ <Page404 /> } />
      </Routes>
      </main>
    <Footer />
    </UserContextProvider>
    <ScrollToTop />
    <ToastContainer  role="alert" stacked />
  </div>; 
}

export default App 