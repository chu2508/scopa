import { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { store } from "./stories/store";
import "windi.css";
import "./app.scss";

export default function App(props: PropsWithChildren<{}>) {
  return <Provider store={store}>{props.children}</Provider>;
}
