/* @refresh reload */
import { For, render } from "solid-js/web";
import { Route, Router } from "@solidjs/router";
import "./index.css";
import Layout, { getTabList } from "./Layout";

render(
  () => (
    <Router root={Layout}>
      <For each={getTabList()}>
        {(list) => <Route path={list.path} component={list.component} />}
      </For>
    </Router>
  ),
  document.getElementById("root") as HTMLElement,
);
