import { AppRegistry } from "react-native";
import App from "./App";
import { initRealm } from "./Realm";

export const realm = initRealm();

AppRegistry.registerComponent("workout", () => App);
