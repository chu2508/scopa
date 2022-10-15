import { System } from "nopun-ecs";
import { PIXIContainerRef, PIXIStageRef } from "../components";

export class PIXIDrawSystem extends System {
  static queries = {
    drawable: [PIXIContainerRef],
  };

  execute(): void {
    const { current: stage } = this.scene.resources.get(PIXIStageRef);

    for (const drawable of this.queries.drawable.added) {
      const { current: container } = drawable.get(PIXIContainerRef);
      stage.addChild(container);
    }
  }
}
