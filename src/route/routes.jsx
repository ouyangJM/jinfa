
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
      }
    ]
  },

  // {
  //   path: "*",
  //   element: <Navigate to="/" replace />,
  // },
];
