import { Types, World, createComponent, createSystem } from "elics";

const COMPS = Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ").map((_, _index) =>
  createComponent({ value: { type: Types.Int16, default: 0 } })
);

const Z = COMPS[25];

const Data = createComponent({ value: { type: Types.Int16, default: 0 } });

class DataSystem extends createSystem({ data: { required: [Data] } }) {
  init() {
    this.value = Data.data.value;
  }

  update() {
    this.queries.data.entities.forEach((entity) => {
      const idx = entity.index;
      this.value[idx] *= 2;
    });
  }
}

class ZSystem extends createSystem({ Z: { required: [Z] } }) {
  init() {
    this.value = Z.data.value;
  }

  update() {
    this.queries.Z.entities.forEach((entity) => {
      const idx = entity.index;
      this.value[idx] *= 2;
    });
  }
}

export default (count) => {
  let world = new World({ checksOn: false });

  COMPS.forEach((Comp) => {
    world.registerComponent(Comp);
  });

  world
    .registerComponent(Data)
    .registerSystem(DataSystem)
    .registerSystem(ZSystem);

  for (let i = 0; i < count; i++) {
    COMPS.forEach((Comp) => {
      world
        .createEntity()
        .addComponent(Comp, { value: 0 })
        .addComponent(Data, { value: 0 });
    });
  }

  return () => {
    world.update(1, 1);
  };
};
