import * as _React from "react";

declare const React: typeof _React;

import { ITodo } from "../models/todoModel";

const classNames = (args: object) => {
	return (
		Object.entries(args)
			.filter(([_, value]) => value)
			.map(([key]) => key)
			.join(" ") || undefined
	);
};

interface ITodoItemProps {
	todo: ITodo;
	editing: boolean;
	onSave: (val: any) => void;
	onDestroy: () => void;
	onEdit: () => void;
	onCancel: (event: any) => void;
	onToggle: () => void;
}

const enum Key {
	ESCAPE_KEY = "Escape",
	ENTER_KEY = "Enter"
}

export class TodoItem extends React.PureComponent<ITodoItemProps, any> {
	handleSubmit = (event: React.FocusEvent<HTMLInputElement>) => {
		const val = event.target.value;

		if (val.length !== 0) {
			this.props.onSave(val);
		} else {
			this.props.onDestroy();
		}
	};

	handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		switch (event.key) {
			case Key.ESCAPE_KEY:
				(event.target as any).value = this.props.todo.title;
				this.props.onCancel(event);
				break;
			case Key.ENTER_KEY:
				this.handleSubmit(event as any);
				break;
			default:
				break;
		}
	};

	render() {
		return (
			<li
				className={classNames({
					completed: this.props.todo.completed,
					editing: this.props.editing
				})}
			>
				<div className="view">
					<input
						className="toggle"
						type="checkbox"
						checked={this.props.todo.completed}
						onChange={this.props.onToggle}
					/>
					<label onDoubleClick={this.props.onEdit}>
						{this.props.todo.title}
					</label>
					<button className="destroy" onClick={this.props.onDestroy} />
				</div>
				{this.props.editing ? (
					<input
						className="edit"
						defaultValue={this.props.todo.title}
						onBlur={this.handleSubmit}
						onKeyDown={this.handleKeyDown}
						autoFocus
					/>
				) : (
					false
				)}
			</li>
		);
	}
}
