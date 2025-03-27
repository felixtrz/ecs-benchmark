import { Types, World, createComponent, createSystem } from "elics";

const A = createComponent({ value: { type: Types.Int16, default: 0 } });

const B = createComponent({ value: { type: Types.Int16, default: 0 } });

class SpawnB extends createSystem({
  A: { required: [A] },
}) {
  update() {
    this.queries.A.entities.forEach((entity) => {
      this.world
        .createEntity()
        .addComponent(B, { value: A.data.value[entity.index] });
    });
  }
}

class KillB extends createSystem({ B: { required: [B] } }) {
  update() {
    this.queries.B.entities.forEach((entity) => {
      entity.destroy();
    });
  }
}

export default (count) => {
  let world = new World({ checksOn: false });

  world
    .registerComponent(A)
    .registerComponent(B)
    .registerSystem(SpawnB)
    .registerSystem(KillB);
  for (let i = 0; i < count; i++) {
    const entity = world.createEntity();
    entity.addComponent(A, { value: i });
  }

  return () => {
    world.update(1, 1);
  };
};
