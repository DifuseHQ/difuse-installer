/* @refresh reload */
import { For, render } from "solid-js/web";
import { Route, Router } from "@solidjs/router";
import "./index.css";
import Layout, { TabList } from "./Layout";

render(
  () => (
    <Router root={Layout}>
      <For each={TabList}>
        {(list) => <Route path={list.path} component={list.component} />}
      </For>
    </Router>
  ),
  document.getElementById("root") as HTMLElement,
);
