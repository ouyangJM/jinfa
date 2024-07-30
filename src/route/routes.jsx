
import Detail from "../pages/Detail.jsx";
import Home from "../pages/Home.jsx";
import Layout from "../pages/Layout.jsx";

export const routes = [
  // public routes
  {
    element: <Layout />,
    children: [
      {
        path:"/",
        element:<Home />
      },
      {
        path:"/detail",
        element:<Detail />
      }
    ]
  },

  // {
  //   path: "*",
  //   element: <Navigate to="/" replace />,
  // },
];
