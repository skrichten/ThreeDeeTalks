import GhostDemo from './pages/GhostDemo';
import FoxDemo from './pages/FoxDemo';
import GDog from './pages/GDog';
import Blamo from './pages/Blamo';
import Seagulls from './pages/Seagulls';
import InfiniteBlamo from './pages/InfiniteBlamo';
import SVGWave from './pages/SVGWave';
import Multiple from './pages/Multiple';
import CurtainsDemo from './pages/CurtainsDemo';
import PlayGround from './pages/Playground';
import Valentine from './pages/Valentine';


const routes = [
  {
    exact: true,
    path: "/",
    component: PlayGround
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
    path: "/distortion",
    component: CurtainsDemo
  },
  {
    path: "/oldblamo",
    component: Blamo
  },
  {
    path: "/playground",
    component: PlayGround
  },
  {
    path: "/valentine",
    component: Valentine
  },
];

export default routes
