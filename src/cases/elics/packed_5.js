import { Types, World, createComponent, createSystem } from "elics";

const A = createComponent({ value: { type: Types.Int16, default: 0 } });
const B = createComponent({ value: { type: Types.Int16, default: 0 } });
const C = createComponent({ value: { type: Types.Int16, default: 0 } });
const D = createComponent({ value: { type: Types.Int16, default: 0 } });
const E = createComponent({ value: { type: Types.Int16, default: 0 } });

class ASystem extends createSystem({ A: { required: [A] } }) {
  init() {
    this.value = A.data.value;
  }

  update() {
    this.queries.A.entities.forEach((entity) => {
      const idx = entity.index;
      this.value[idx] *= 2;
    });
  }
}

class BSystem extends createSystem({ B: { required: [B] } }) {
  init() {
    this.value = B.data.value;
  }

  update() {
    this.queries.B.entities.forEach((entity) => {
      const idx = entity.index;
      this.value[idx] *= 2;
    });
  }
}

class CSystem extends createSystem({ C: { required: [C] } }) {
  init() {
    this.value = C.data.value;
  }

  update() {
    this.queries.C.entities.forEach((entity) => {
      const idx = entity.index;
      this.value[idx] *= 2;
    });
  }
}

class DSystem extends createSystem({ D: { required: [D] } }) {
  init() {
    this.value = D.data.value;
  }

  update() {
    this.queries.D.entities.forEach((entity) => {
      const idx = entity.index;
      this.value[idx] *= 2;
    });
  }
}

class ESystem extends createSystem({ E: { required: [E] } }) {
  init() {
    this.value = E.data.value;
  }

  update() {
    this.queries.E.entities.forEach((entity) => {
      const idx = entity.index;
      this.value[idx] *= 2;
    });
  }
}

export default (count) => {
  let world = new World({ checksOn: false });

  world
    .registerComponent(A)
    .registerComponent(B)
    .registerComponent(C)
    .registerComponent(D)
    .registerComponent(E)
    .registerSystem(ASystem)
    .registerSystem(BSystem)
    .registerSystem(CSystem)
    .registerSystem(DSystem)
    .registerSystem(ESystem);

  for (let i = 0; i < count; i++) {
    world
      .createEntity()
      .addComponent(A, { value: 0 })
      .addComponent(B, { value: 0 })
      .addComponent(C, { value: 0 })
      .addComponent(D, { value: 0 })
      .addComponent(E, { value: 0 });
  }

  return () => {
    world.update(1, 1);
  };
};
