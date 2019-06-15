import GhostDemo from './pages/GhostDemo';
import FoxDemo from './pages/FoxDemo';


const routes = [
  {
    exact: true,
    path: "/",
    component: FoxDemo
  },
  {
    path: "/ghost",
    component: GhostDemo
  },
  {
    path: "/fox",
    component: FoxDemo
  }
];

export default routes
