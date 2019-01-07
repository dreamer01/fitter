import { realm } from "../index";

export const TodoSchema = {
  name: "Todo",
  primaryKey: "id",
  properties: {
    id: "string",
    day: "string",
    type: "string",
    title: "string",
    details: "string",
    status: "bool"
  }
};

export const addItem = todoItem => {
  realm.write(() => {
    realm.create(TodoSchema.name, todoItem);
  });
};

export const getItems = ({ day }) => {
  return realm.objects(TodoSchema.name).filtered(`day =="${day}"`);
};

export const deleteItem = ({ id }) => {
  realm.write(() => {
    let deleteItem = realm.objects(TodoSchema.name).filtered(`id =="${id}"`);
    realm.delete(deleteItem);
  });
};

export const updateItem = todoItem => {
  realm.write(() => {
    realm.create(TodoSchema.name, todoItem, true);
    //let updateItem = realm.objectForPrimaryKey(TodoSchema, id);
    // let updateItem = realm
    //   .objects(TodoSchema.name)
    //   .filtered(`id =="${todoItem.id}"`);
    // updateItem[0].details = todoItem.details;
  });
};

export const RunSchema = {
  name: "Run",
  properties: {
    positions: "data",
    duration: "int",
    distance: "int",
    speed: "float",
    date: "date"
  }
};

export const addRun = runItem => {
  //console.log(runItem);
  realm.write(() => {
    realm.create(RunSchema.name, runItem);
  });
};

export const getRuns = ({ date }) => {
  return realm.objects(RunSchema.name).filtered(`date =="${date}"`);
};
