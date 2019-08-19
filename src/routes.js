import GhostDemo from './pages/GhostDemo';
import FoxDemo from './pages/FoxDemo';
import GDog from './pages/GDog';
import Blamo from './pages/Blamo';
import Seagulls from './pages/Seagulls';
import InfiniteBlamo from './pages/InfiniteBlamo';
import SVGWave from './pages/SVGWave';
import Multiple from './pages/Multiple';
import CurtainsDemo from './pages/CurtainsDemo';


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
    path: "/multi",
    component: Multiple
  },
  {
    path: "/curt",
    component: CurtainsDemo
  },
  {
    path: "/oldblamo",
    component: Blamo
  }
];

export default routes
