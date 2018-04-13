import * as _React from "react";
import * as _ReactDOM from "react-dom";
declare const React: typeof _React;
declare const ReactDOM: typeof _ReactDOM;

import { TodoModel } from "./models/todoModel.js";
import { TodoApp } from "./components/App.js";

document.addEventListener("DOMContentLoaded", () => {
	ReactDOM.render(
		<TodoApp model={new TodoModel("typescript-react-esm-todos")} />,
		document.querySelector(".todoapp")
	);
});
