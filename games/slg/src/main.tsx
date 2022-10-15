import { Application } from "pixi.js";
import { Scene } from "nopun-ecs";

import "./app.css";
import { StageRef } from "./components";
import { BattlefieldSystem } from "./systems/battlefields";
import { createBattlefield } from "./entities/battlefields";

const scene = new Scene();

const rootElement = document.getElementById("root");
const application = new Application({ resizeTo: rootElement!, backgroundColor: 0x333333 });

scene.resources.add(StageRef, { current: application.stage });

scene.systems.register(BattlefieldSystem);

createBattlefield(scene);

rootElement?.appendChild(application.view);
application.ticker.add((dt) => {
  scene.execute(dt);
});
