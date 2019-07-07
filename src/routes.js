import GhostDemo from './pages/GhostDemo';
import FoxDemo from './pages/FoxDemo';
import GDog from './pages/GDog';
import Blamo from './pages/Blamo';
import Seagulls from './pages/Seagulls';
import InfiniteBlamo from './pages/InfiniteBlamo';


const routes = [
  {
    exact: true,
    path: "/",
    component: Seagulls
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
  },
  {
    path: "/blamo",
    component: InfiniteBlamo
  },
  {
    path: "/seagulls",
    component: Seagulls
  },
  {
    path: "/oldblamo",
    component: Blamo
  }
];

export default routes
