const classNames = (args) => {
    return (Object.entries(args)
        .filter(([_, value]) => value)
        .map(([key]) => key)
        .join(" ") || undefined);
};
export class TodoItem extends React.PureComponent {
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
//# sourceMappingURL=TodoItem.js.map