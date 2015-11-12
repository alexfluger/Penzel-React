/// <reference path="../../typings/react/react.d.ts" />
import * as React from "react"

class Person {
	public name;
	public age;
}

class PersonState {
	public age;
}

class Demo extends React.Component<Person, PersonState> {
	constructor(props: Person) {
		super(props);
		this.state = {
			age: props.age
		}
	}
	clicked(e) {
		this.state.age++;
		this.forceUpdate();
	}
	render() {
		var random = Math.random() > 0.5 ? <b>0</b> : <i>1</i>;
		return (
			<div>
				Hello, {this.props.name}, I am {this.state.age} years old.
				<button onClick={(e) => this.clicked(e)}>Say Happy B-Day</button>
				<Another dyn={this.props.age} />
				{random}
			</div>
		)
	}
}

class Another extends React.Component<{dyn}, {}> {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<b>{this.props.dyn}</b>
		);
	}
}

React.render(<Demo name="World" age="10"></Demo>, document.getElementsByTagName('body')[0]);