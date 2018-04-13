import * as _React from "react";

declare const React: typeof _React;

import { Showing } from "./App.js";

interface IFooterProps {
	activeTodoCount: number;
	hasCompCompleted: boolean;
	nowShowing: string;
	onClearCompleted: () => void;
}

export const Footer = (props: IFooterProps) => (
	<footer className="footer" key="Footer">
		<span className="todo-count">
			<strong>{props.activeTodoCount}</strong>{" "}
			{props.activeTodoCount === 1 ? "item" : "items"} left
		</span>
		<ul className="filters">
			<li>
				<a
					className={
						props.nowShowing === Showing.ALL_TODOS ? "selected" : undefined
					}
					href="#/"
				>
					All
				</a>
			</li>
			<li>
				<a
					className={
						props.nowShowing === Showing.ACTIVE_TODOS ? "selected" : undefined
					}
					href="#/active"
				>
					Active
				</a>
			</li>
			<li>
				<a
					className={
						props.nowShowing === Showing.COMPLETED_TODOS
							? "selected"
							: undefined
					}
					href="#/completed"
				>
					Completed
				</a>
			</li>
		</ul>
		{props.hasCompCompleted ? (
			<button className="clear-completed" onClick={props.onClearCompleted}>
				Clear completed
			</button>
		) : (
			false
		)}
	</footer>
);
