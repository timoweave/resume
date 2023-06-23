import { Resume } from './components/Resume';
import { SignIn } from './components/Login';
import { createBrowserRouter, RouteObject } from 'react-router-dom';

export const resumeRoute: RouteObject = {
  path: '/resume',
  element: <Resume />,
};

export const loginRoute: RouteObject = {
  path: '/login',
  element: <SignIn />,
};

export const routes = [resumeRoute, loginRoute];

export const router = createBrowserRouter(routes);
