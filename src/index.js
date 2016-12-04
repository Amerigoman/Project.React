import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {

	render() {
		return (
			<div>
				<h1>Application!!!</h1>
				<p>Now it is working! Yeah!</p>
			</div>

		);
	}

}

ReactDOM.render(
	<App />,
	document.getElementById('app')
);
