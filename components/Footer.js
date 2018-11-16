export const Footer = props => (React.createElement("footer", { className: "footer", key: "Footer" },
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
//# sourceMappingURL=Footer.js.map