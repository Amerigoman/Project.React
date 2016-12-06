import React from 'react';
import Input from '../../components/ui/input/index';
import { bindAll } from 'lodash';
import './style.less';

export default class HomePage extends React.Component {
    
	static path = '/';

	constructor(props) {
		super(props);

		this.state = {
			todoName: '',
			todos: [
				{
					id: 1,
					name: 'todo 1'
				}
			]
		};

		bindAll(this, ['renderTodos', 'inputOnChange', 'addTodo']);
	}

	inputOnChange(value) {
		this.setState({ todoName: value });
	}

	renderTodos(item, index) {
		return (
			<li key={ index }>{ item.name }</li>
		);
	}

	addTodo() {
		if ( this.state.todoName === '' ) {
			this.setState({ error: 'Поле не должно быть пустым' });
			return;
		}

		const id = this.state.todos[ this.state.todos.length - 1 ].id + 1;
		const name = this.state.todoName;

		const todos = this.state.todos;
		todos.push({ id, name });

		this.setState({ todos });
		this.setState({ todoName: '', error: '' });
	}

    
	render() {
		const { todoName, todos, error } = this.state;

		return (
			<div className='row b-home'>
				<div className='col-xs-12'>
					<ul>
						{ todos.map(this.renderTodos) }
					</ul>
					<div className='col-xs-4'>
						<Input
							onChange={ this.inputOnChange }
							value={ todoName }
							error={ error }
						/>
						<button className='btn-primary'
										onClick={ this.addTodo }>Add to do</button>
					</div>
				</div>
			</div>
		);
	}
}
