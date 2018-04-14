import * as _React from "react";
declare const React: typeof _React;

import { ITodoModel, ITodo } from "../models/todoModel.js";
import { Header } from "./Header.js";
import { TodoItem } from "./TodoItem.js";
import { Footer } from "./Footer.js";

interface IAppState {
	editing?: number;
	nowShowing: Showing;
}

export const enum Showing {
	ALL_TODOS = "all",
	ACTIVE_TODOS = "active",
	COMPLETED_TODOS = "completed"
}

interface IAppProps {
	model: ITodoModel;
}

export class TodoApp extends React.Component<IAppProps, IAppState> {
	constructor(props: IAppProps) {
		super(props);
		this.props.model.subscribe(this.setState.bind(this, {}));
	}

	public state: IAppState = {
		nowShowing: Showing.ALL_TODOS
	};

	componentDidMount() {
		window.addEventListener(
			"hashchange",
			() => {
				switch (location.hash) {
					case "#/active":
						this.setState({ nowShowing: Showing.ACTIVE_TODOS });
						break;
					case "#/completed":
						this.setState({ nowShowing: Showing.COMPLETED_TODOS });
						break;
					case "#/":
					default:
						this.setState({ nowShowing: Showing.ALL_TODOS });
						break;
				}
			},
			{ passive: true }
		);
	}

	add = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key !== "Enter") {
			return;
		}
		event.preventDefault();
		const input = event.target as HTMLInputElement;
		const value = input.value.trim();
		if (value.length > 0) {
			this.props.model.addTodo(value);
			input.value = "";
		}
	};

	toggleAll = (event: React.ChangeEvent<HTMLInputElement>) => {
		const checked = event.target.checked;
		this.props.model.toggleAll(checked);
	};

	toggle = (todoToToggle: ITodo) => {
		this.props.model.toggle(todoToToggle);
	};

	destroy = (todo: ITodo) => {
		this.props.model.destroy(todo);
	};

	edit = (todo: ITodo) => {
		this.setState({ editing: todo.id });
	};

	save = (todoToSave: ITodo, text: string) => {
		this.props.model.save(todoToSave, text);
		this.setState({ editing: undefined });
	};

	cancel = () => {
		this.setState({ editing: undefined });
	};

	clearCompleted = () => {
		this.props.model.clearCompleted();
	};

	get shownTodos() {
		return this.props.model.todos.filter(todo => {
			switch (this.state.nowShowing) {
				case Showing.ACTIVE_TODOS:
					return !todo.completed;
				case Showing.COMPLETED_TODOS:
					return todo.completed;
				default:
					return true;
			}
		});
	}

	get TodoList() {
		return (
			<ul className="todo-list">
				{this.shownTodos.map(todo => (
					<TodoItem
						key={todo.id}
						todo={todo}
						editing={this.state.editing == todo.id}
						onToggle={this.toggle.bind(this, todo)}
						onDestroy={this.destroy.bind(this, todo)}
						onEdit={this.edit.bind(this, todo)}
						onSave={this.save.bind(this, todo)}
						onCancel={this.cancel}
					/>
				))}
			</ul>
		);
	}

	get Main() {
		return (
			<section className="main" key="Main">
				<input
					id="toggle-all"
					className="toggle-all"
					type="checkbox"
					checked={this.activeTodoCount === 0}
					onChange={this.toggleAll}
				/>
				<label htmlFor="toggle-all">Mark all as complete</label>
				{this.TodoList}
			</section>
		);
	}

	get activeTodoCount() {
		return this.props.model.todos.reduce(function(accum, todo) {
			return todo.completed ? accum : accum + 1;
		}, 0);
	}

	get hasCompCompleted() {
		return this.props.model.todos.some(todo => todo.completed);
	}

	render() {
		return (
			<>
				<Header key="Header" onAddTodo={this.add} />
				{this.props.model.todos.length > 0 ? (
					<>
						{this.Main}
						{Footer({
							activeTodoCount: this.activeTodoCount,
							hasCompCompleted: this.hasCompCompleted,
							onClearCompleted: this.clearCompleted,
							nowShowing: this.state.nowShowing
						})}
					</>
				) : (
					false
				)}
			</>
		);
	}
}
