import { store } from "./store.js";

export interface ITodo {
	id: number;
	title: string;
	completed: boolean;
}

export interface ITodoModel {
	key: any;
	todos: Array<ITodo>;
	onChanges: Array<any>;
	subscribe(onChange: any): void;
	inform(): void;
	addTodo(title: string): void;
	toggleAll(checked: boolean): void;
	toggle(todoToToggle: ITodo): void;
	destroy(todo: ITodo): void;
	save(todoToSave: ITodo, text: string): void;
	clearCompleted(): void;
}

export class TodoModel implements ITodoModel {
	public key: string;
	public todos: Array<ITodo>;
	public onChanges: Array<any>;

	constructor(key: string) {
		this.key = key;
		this.todos = store(key);
		this.onChanges = [];
	}

	public subscribe(onChange: any) {
		this.onChanges.push(onChange);
	}

	public inform() {
		store(this.key, this.todos);
		this.onChanges.forEach(cb => {
			cb();
		});
	}

	public addTodo(title: string) {
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

	public toggleAll(checked: boolean) {
		this.todos = this.todos.map<ITodo>((todo: ITodo) => {
			return { ...todo, completed: checked };
		});

		this.inform();
	}

	public toggle(todoToToggle: ITodo) {
		this.todos = this.todos.map<ITodo>((todo: ITodo) => {
			return todo !== todoToToggle
				? todo
				: { ...todo, completed: !todo.completed };
		});

		this.inform();
	}

	public destroy(todo: ITodo) {
		this.todos = this.todos.filter(candidate => candidate !== todo);

		this.inform();
	}

	public save(todoToSave: ITodo, text: string) {
		this.todos = this.todos.map(todo => {
			return todo !== todoToSave ? todo : { ...todo, title: text };
		});

		this.inform();
	}

	public clearCompleted() {
		this.todos = this.todos.filter(todo => !todo.completed);

		this.inform();
	}
}
