import { LStorage, delay } from '../../utils/index';

export const ADD_TODO = 'ADD_TODO';
export const LIKE_TODO = 'LIKE_TODO';
export const DEL_TODO = 'DEL_TODO';
export const GET_TODO = 'GET_TODO';

export function addTodo(id, name) {
	let error = '';
	if (!name) {
		error = 'Введите название';
	}
	return {
		type: 'ADD_TODO',
		id, name, error
	};
}

export function likeTodo(todo) {

	const liked = !todo.liked;

	return {
		type: 'LIKE_TODO',
		todo, liked
	};
}

export function deleteTodo(todo) {
	return {
		type: 'DEL_TODO',
		todo
	};
}

export function getTodo() {
	const todos = LStorage.get('todos');

	return (dispatch) => {
		delay(5000).then(() => {
			dispatch({
				type: 'GET_TODO',
				todos
			});
		});
	};
}
