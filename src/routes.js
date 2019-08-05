import GhostDemo from './pages/GhostDemo';
import FoxDemo from './pages/FoxDemo';
import GDog from './pages/GDog';
import Blamo from './pages/Blamo';
import Seagulls from './pages/Seagulls';
import InfiniteBlamo from './pages/InfiniteBlamo';
import SVGWave from './pages/SVGWave';


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
    path: "/wave",
    component: SVGWave
  },
  {
    path: "/oldblamo",
    component: Blamo
  }
];

export default routes
