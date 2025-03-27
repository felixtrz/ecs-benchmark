import { Types, World, createComponent, createSystem } from "elics";

const A = createComponent({ value: { type: Types.Int16, default: 0 } });
const B = createComponent({ value: { type: Types.Int16, default: 0 } });
const C = createComponent({ value: { type: Types.Int16, default: 0 } });
const D = createComponent({ value: { type: Types.Int16, default: 0 } });
const E = createComponent({ value: { type: Types.Int16, default: 0 } });

class ABSystem extends createSystem({ AB: { required: [A, B] } }) {
  init() {
    this.valueA = A.data.value;
    this.valueB = B.data.value;
  }

  update() {
    this.queries.AB.entities.forEach((entity) => {
      const idx = entity.index;
      const x = this.valueA[idx];
      this.valueA[idx] = this.valueB[idx];
      this.valueB[idx] = x;
    });
  }
}

class CDSystem extends createSystem({ CD: { required: [C, D] } }) {
  init() {
    this.valueC = C.data.value;
    this.valueD = D.data.value;
  }

  update() {
    this.queries.CD.entities.forEach((entity) => {
      const idx = entity.index;
      const x = this.valueC[idx];
      this.valueC[idx] = this.valueD[idx];
      this.valueD[idx] = x;
    });
  }
}

class CESystem extends createSystem({ CE: { required: [C, E] } }) {
  init() {
    this.valueC = C.data.value;
    this.valueE = E.data.value;
  }

  update() {
    this.queries.CE.entities.forEach((entity) => {
      const idx = entity.index;
      const x = this.valueC[idx];
      this.valueC[idx] = this.valueE[idx];
      this.valueE[idx] = x;
    });
  }
}

export default (count) => {
  let world = new World({ checksOn: false });

  world.registerComponent(A, 4000);
  world.registerComponent(B, 4000);
  world.registerComponent(C, 4000);
  world.registerComponent(D, 4000);
  world.registerComponent(E, 4000);

  world.registerSystem(ABSystem);
  world.registerSystem(CDSystem);
  world.registerSystem(CESystem);

  for (let i = 0; i < count; i++) {
    world
      .createEntity()
      .addComponent(A, { value: 0 })
      .addComponent(B, { value: 1 });

    world
      .createEntity()
      .addComponent(A, { value: 0 })
      .addComponent(B, { value: 1 })
      .addComponent(C, { value: 2 });

    world
      .createEntity()
      .addComponent(A, { value: 0 })
      .addComponent(B, { value: 1 })
      .addComponent(C, { value: 2 })
      .addComponent(D, { value: 3 });

    world
      .createEntity()
      .addComponent(A, { value: 0 })
      .addComponent(B, { value: 1 })
      .addComponent(C, { value: 2 })
      .addComponent(E, { value: 4 });
  }

  return () => {
    world.update(1, 1);
  };
};
