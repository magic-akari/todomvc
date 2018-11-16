import { TodoModel } from "./models/todoModel.js";
import { TodoApp } from "./components/App.js";
ReactDOM.render(React.createElement(TodoApp, { model: new TodoModel("typescript-react-esm-todos") }), document.querySelector(".todoapp"));
//# sourceMappingURL=app.js.map