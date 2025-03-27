import { World, createComponent, createSystem } from "elics";

const A = createComponent({});

const B = createComponent({});

class AddB extends createSystem({
  ANotB: { required: [A], excluded: [B] },
}) {
  update() {
    this.queries.ANotB.entities.forEach((entity) => {
      entity.addComponent(B);
    });
  }
}

class RemoveB extends createSystem({
  B: { required: [B] },
}) {
  update() {
    this.queries.B.entities.forEach((entity) => {
      entity.removeComponent(B);
    });
  }
}

export default (count) => {
  let world = new World({ checksOn: false, deferredEntityUpdates: true });

  world
    .registerComponent(A)
    .registerComponent(B)
    .registerSystem(AddB)
    .registerSystem(RemoveB);

  for (let i = 0; i < count; i++) {
    world.createEntity().addComponent(A);
  }

  return () => {
    world.update(1, 1);
  };
};
