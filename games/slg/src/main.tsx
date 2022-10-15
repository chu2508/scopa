import { Application } from "pixi.js";
import { Scene } from "nopun-ecs";

import "./app.css";

const scene = new Scene();

const rootElement = document.getElementById("root");
const application = new Application({ resizeTo: rootElement!, backgroundColor: 0x333333 });

rootElement?.appendChild(application.view);
application.ticker.add((dt) => {
  scene.execute(dt);
});
