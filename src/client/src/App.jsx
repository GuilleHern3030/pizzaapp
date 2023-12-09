import { useEffect, useMemo } from "react";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
//import { BrowserRouter, Routes, Route } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { setArticles } from "./redux/reducers/articles/articlesSlice";
import { getArticles } from "./api/articles";

// BaseName
import options from './data/routes.json';

// Styles
import './App.css';

// Pages
import NotFound from './routes/not-found/NotFound';
import Home from './routes/home/Home';
import About from './routes/about/About';
import Contact from './routes/contact/Contact';
import Menu from './routes/menu/Menu';
import Article from "./components/menu/summary/ArticleSummary";
import Ticket from "./components/menu/ticket/Ticket";
import Admin from './routes/admin/Admin';

const routes = createBrowserRouter([
  {
    path: "*",
    element: <Home/>,
    errorElement: <NotFound/>
  },
  {
    path: "/about",
    element: <About/>,
    errorElement: <NotFound/>
  },
  {
    path: "/contact",
    element: <Contact/>,
    errorElement: <NotFound/>
  },
  {
    path: "/menu",
    element: <Menu/>,
    errorElement: <NotFound/>,
    children: [
      {
        path: "article/:id",
        element: <Article/>
      },
      {
        path: "ticket",
        element: <Ticket/>
      }
    ]
  },
  {
    path: "/admin",
    element: <Admin/>,
    errorElement: <NotFound/>
  }
],
options)

export default function App() {

  // Redux
  const dispatch = useDispatch();
  const { articles } = useSelector(state => state.articles);

  useEffect(() => {
    const fetchData = async() => {
      if (articles == undefined) {
        try {
          const articles = await getArticles()
          dispatch(setArticles({articles}))
        } catch (e) {
          console.warn(e)
          dispatch(setArticles({articles:null}))
        }
      }
    }
    fetchData();
  }, []);

  return <RouterProvider router={routes}/>;
  
  /*return <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
    </Routes>
  </BrowserRouter>
  */
}