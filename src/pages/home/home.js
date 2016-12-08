import React, { PropTypes } from 'react';
import Input from '../../components/ui/input/index';
import Loader from '../../components/ui/loader/index';

import { bindAll } from 'lodash';
import { connect } from 'react-redux';
import {
	addTodo,
	likeTodo,
	deleteTodo,
	getTodo } from './actions';
import { LStorage } from '../../utils/index';

import classnames from 'classnames';
import './style.less';

class HomePage extends React.Component {
    
	static path = '/';

	static propTypes = {
		home: PropTypes.object.isRequired,
		dispatch: PropTypes.func.isRequired
	};

	constructor(props) {
		super(props);

		this.state = {
			todoName: ''
		};

		bindAll(this, ['renderTodos', 'inputOnChange', 'addTodo']);
	}

	componentWillMount() {
		this.props.dispatch( getTodo() );
	}

	inputOnChange(value) {
		this.setState({ todoName: value });
	}

	renderTodos(item, index) {
		const todoClasses = classnames('b-home-todo', {
			'is-liked': item.liked
		});
		/* const btnClasses = classnames('btn', {
			'active': item.liked
		});*/
		const iconClasses = classnames('glyphicon', {
			'glyphicon-heart-empty': !item.liked,
			'glyphicon-heart': item.liked
		});

		return (
			<li key={ index }>
				<span className={ todoClasses }>{ item.name }</span>
				<button className='btn' onClick={ this.deleteTodo.bind(this, item) }>
					<i className='glyphicon glyphicon-remove'/></button>
				<button className='btn' onClick={ this.likeToDo.bind(this, item) }>
					<i className={ iconClasses }/></button>
			</li>
		);
	}

	deleteTodo(todo) {
		this.props.dispatch( deleteTodo(todo) );
	}

	likeToDo(todo) {
		this.props.dispatch( likeTodo(todo) );
	}

	addTodo() {
		const { todos } = this.props.home;
		const id = todos[ todos.length - 1 ].id + 1;
		const name = this.state.todoName;
		this.props.dispatch( addTodo(id, name) );
		this.setState({ todoName: '' });
	}
    
	render() {
		const { todoName } = this.state;
		const { todos, error } = this.props.home;
		LStorage.set('todos', todos);

		return (
			<div className='row b-home'>
				<div className='col-xs-12'>
					<ul>
						{ todos.length === 0 ? <Loader/> : todos.map(this.renderTodos) }
					</ul>
					<div className='col-xs-4'>
						<Input
							onChange={ this.inputOnChange }
							value={ todoName }
							error={ error }
						/>
						<button className='btn-primary b-home--submit'
										onClick={ this.addTodo }>Add to do</button>
					</div>
				</div>
			</div>
		);
	}

	/* componentWillUnmount() {
		this.props.dispatch( saveTodos(this.props.home.todos) );
	}*/
}

function mapStateToProps(state) {
	return {
		home: state.home
	};
}

export default connect(mapStateToProps)(HomePage);
