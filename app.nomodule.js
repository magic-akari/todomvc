

ReactDOM.render(React.createElement(TodoApp, { model: new TodoModel("typescript-react-esm-todos") }), document.querySelector(".todoapp"));




class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nowShowing: "all" /* ALL_TODOS */
        };
        this.add = (event) => {
            if (event.key !== "Enter") {
                return;
            }
            event.preventDefault();
            const input = event.target;
            const value = input.value.trim();
            if (value.length > 0) {
                this.props.model.addTodo(value);
                input.value = "";
            }
        };
        this.toggleAll = (event) => {
            const checked = event.target.checked;
            this.props.model.toggleAll(checked);
        };
        this.toggle = (todoToToggle) => {
            this.props.model.toggle(todoToToggle);
        };
        this.destroy = (todo) => {
            this.props.model.destroy(todo);
        };
        this.edit = (todo) => {
            this.setState({ editing: todo.id });
        };
        this.save = (todoToSave, text) => {
            this.props.model.save(todoToSave, text);
            this.setState({ editing: undefined });
        };
        this.cancel = () => {
            this.setState({ editing: undefined });
        };
        this.clearCompleted = () => {
            this.props.model.clearCompleted();
        };
        this.props.model.subscribe(this.setState.bind(this, this.state));
    }
    componentDidMount() {
        window.addEventListener("hashchange", () => {
            switch (location.hash) {
                case "#/active":
                    this.setState({ nowShowing: "active" /* ACTIVE_TODOS */ });
                    break;
                case "#/completed":
                    this.setState({ nowShowing: "completed" /* COMPLETED_TODOS */ });
                    break;
                case "#/":
                default:
                    this.setState({ nowShowing: "all" /* ALL_TODOS */ });
                    break;
            }
        }, { passive: true });
    }
    get shownTodos() {
        return this.props.model.todos.filter(todo => {
            switch (this.state.nowShowing) {
                case "active" /* ACTIVE_TODOS */:
                    return !todo.completed;
                case "completed" /* COMPLETED_TODOS */:
                    return todo.completed;
                default:
                    return true;
            }
        });
    }
    get TodoList() {
        return (React.createElement("ul", { className: "todo-list" }, this.shownTodos.map(todo => (React.createElement(TodoItem, { key: todo.id, todo: todo, editing: this.state.editing == todo.id, onToggle: this.toggle.bind(this, todo), onDestroy: this.destroy.bind(this, todo), onEdit: this.edit.bind(this, todo), onSave: this.save.bind(this, todo), onCancel: this.cancel })))));
    }
    get Main() {
        return (React.createElement("section", { className: "main", key: "Main" },
            React.createElement("input", { id: "toggle-all", className: "toggle-all", type: "checkbox", checked: this.activeTodoCount === 0, onChange: this.toggleAll }),
            React.createElement("label", { htmlFor: "toggle-all" }, "Mark all as complete"),
            this.TodoList));
    }
    get activeTodoCount() {
        return this.props.model.todos.reduce(function (accum, todo) {
            return todo.completed ? accum : accum + 1;
        }, 0);
    }
    get hasCompCompleted() {
        return this.props.model.todos.some(todo => todo.completed);
    }
    render() {
        return (React.createElement(React.Fragment, null,
            React.createElement(Header, { key: "Header", onAddTodo: this.add }),
            this.props.model.todos.length > 0 ? (React.createElement(React.Fragment, null,
                this.Main,
                Footer({
                    activeTodoCount: this.activeTodoCount,
                    hasCompCompleted: this.hasCompCompleted,
                    onClearCompleted: this.clearCompleted,
                    nowShowing: this.state.nowShowing
                }))) : (false)));
    }
}

const Footer = props => (React.createElement("footer", { className: "footer", key: "Footer" },
    React.createElement("span", { className: "todo-count" },
        React.createElement("strong", null, props.activeTodoCount),
        " ",
        props.activeTodoCount === 1 ? "item" : "items",
        " left"),
    React.createElement("ul", { className: "filters" },
        React.createElement("li", null,
            React.createElement("a", { className: props.nowShowing === "all" /* ALL_TODOS */ ? "selected" : undefined, href: "#/" }, "All")),
        React.createElement("li", null,
            React.createElement("a", { className: props.nowShowing === "active" /* ACTIVE_TODOS */ ? "selected" : undefined, href: "#/active" }, "Active")),
        React.createElement("li", null,
            React.createElement("a", { className: props.nowShowing === "completed" /* COMPLETED_TODOS */
                    ? "selected"
                    : undefined, href: "#/completed" }, "Completed"))),
    props.hasCompCompleted ? (React.createElement("button", { className: "clear-completed", onClick: props.onClearCompleted }, "Clear completed")) : (false)));

const Header = props => (React.createElement("header", { className: "header" },
    React.createElement("h1", null, "todos"),
    React.createElement("input", { name: "new-todo", className: "new-todo", placeholder: "What needs to be done?", onKeyDown: props.onAddTodo, autoFocus: true })));

const classNames = (args) => {
    return (Object.entries(args)
        .filter(([_, value]) => value)
        .map(([key]) => key)
        .join(" ") || undefined);
};
class TodoItem extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.handleSubmit = (event) => {
            const val = event.target.value;
            if (val.length !== 0) {
                this.props.onSave(val);
            }
            else {
                this.props.onDestroy();
            }
        };
        this.handleKeyDown = (event) => {
            switch (event.key) {
                case "Escape" /* ESCAPE_KEY */:
                    event.target.value = this.props.todo.title;
                    this.props.onCancel(event);
                    break;
                case "Enter" /* ENTER_KEY */:
                    this.handleSubmit(event);
                    break;
                default:
                    break;
            }
        };
    }
    render() {
        return (React.createElement("li", { className: classNames({
                completed: this.props.todo.completed,
                editing: this.props.editing
            }) },
            React.createElement("div", { className: "view" },
                React.createElement("input", { className: "toggle", type: "checkbox", checked: this.props.todo.completed, onChange: this.props.onToggle }),
                React.createElement("label", { onDoubleClick: this.props.onEdit }, this.props.todo.title),
                React.createElement("button", { className: "destroy", onClick: this.props.onDestroy })),
            this.props.editing ? (React.createElement("input", { className: "edit", defaultValue: this.props.todo.title, onBlur: this.handleSubmit, onKeyDown: this.handleKeyDown, autoFocus: true })) : (false)));
    }
}

const store = (namespace, data) => {
    if (data) {
        return localStorage.setItem(namespace, JSON.stringify(data));
    }
    const store = localStorage.getItem(namespace);
    return (store && JSON.parse(store)) || [];
};


class TodoModel {
    constructor(key) {
        this.key = key;
        this.todos = store(key);
        this.onChanges = [];
    }
    subscribe(onChange) {
        this.onChanges.push(onChange);
    }
    inform() {
        store(this.key, this.todos);
        this.onChanges.forEach(cb => {
            cb();
        });
    }
    addTodo(title) {
        this.todos = [
            ...this.todos,
            {
                id: Date.now(),
                title: title,
                completed: false
            }
        ];
        this.inform();
    }
    toggleAll(checked) {
        this.todos = this.todos.map((todo) => {
            return { ...todo, completed: checked };
        });
        this.inform();
    }
    toggle(todoToToggle) {
        this.todos = this.todos.map((todo) => {
            return todo !== todoToToggle
                ? todo
                : { ...todo, completed: !todo.completed };
        });
        this.inform();
    }
    destroy(todo) {
        this.todos = this.todos.filter(candidate => candidate !== todo);
        this.inform();
    }
    save(todoToSave, text) {
        this.todos = this.todos.map(todo => {
            return todo !== todoToSave ? todo : { ...todo, title: text };
        });
        this.inform();
    }
    clearCompleted() {
        this.todos = this.todos.filter(todo => !todo.completed);
        this.inform();
    }
}
