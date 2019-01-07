import Realm from "realm";

import { TodoSchema, RunSchema } from "./Model";

export const initRealm = () => {
  return new Realm({
    //path: `/realms/Todo.realm`,
    schema: [TodoSchema, RunSchema],
    schemaVersion: 0,
    migration: (oldRealm, newRealm) => {}
  });
  // .then(realm => realm)
  // .catch(error => console.log("Initializing Error : ", error));
};
