import { Application } from "pixi.js";
import { Scene } from "nopun-ecs";

import "./app.css";
import { createBattlefield } from "./entities";
import { HexMap } from "./components";
import { PIXIStageRef } from "./components/pixi";
import { PIXIDrawSystem } from "./systems/draws";
import { BattlefieldSystem } from "./systems/battlefields";

const rootElement = document.getElementById("root");
const application = new Application({ resizeTo: rootElement!, backgroundColor: 0x333333 });
rootElement?.appendChild(application.view);

const scene = new Scene();
scene.resources.add(HexMap, { rows: 5, columns: 5 });
scene.resources.add(PIXIStageRef, { current: application.stage });

scene.systems.register(PIXIDrawSystem);
scene.systems.register(BattlefieldSystem);

createBattlefield(scene);

application.ticker.add((dt) => {
  scene.execute(dt);
});
