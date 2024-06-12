import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./features/Home";
import RootLayout from "./ui/RootLayout";
import NotFound from "./ui/NotFound";
import UpdateForm from "./features/users/UpadteForm";
import AddForm from "./features/users/AddForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/addform", element: <AddForm /> },
      { path: "/updateform/:id", element: <UpdateForm /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
