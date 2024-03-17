import ImagePage from './pages/ImagePage';
import LoginPage from './pages/LoginPage'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
  },
  {
    path: '/image',
    element: <ImagePage />,
  },
])

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
