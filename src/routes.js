import GhostDemo from './pages/GhostDemo';
import FoxDemo from './pages/FoxDemo';
import GDog from './pages/GDog';


const routes = [
  {
    exact: true,
    path: "/",
    component: GDog
  },
  {
    path: "/gdog",
    component: GDog
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
