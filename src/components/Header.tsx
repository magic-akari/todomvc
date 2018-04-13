import * as _React from "react";

declare const React: typeof _React;

interface IHeaderProps {
	onAddTodo(event: React.KeyboardEvent<HTMLInputElement>): void;
}

export const Header = (props: IHeaderProps) => (
	<header className="header">
		<h1>todos</h1>
		<input
			name="new-todo"
			className="new-todo"
			placeholder="What needs to be done?"
			onKeyDown={props.onAddTodo}
			autoFocus
		/>
	</header>
);
