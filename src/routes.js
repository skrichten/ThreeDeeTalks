import GhostDemo from './pages/GhostDemo';
import FoxDemo from './pages/FoxDemo';


const routes = [
  {
    exact: true,
    path: "/",
    component: FoxDemo
  },
  {
    path: "/fox",
    component: FoxDemo
  },
  {
    path: "/ghost",
    component: GhostDemo
  }
];

export default routes
