/// <reference path="../../typings/react/react.d.ts" />
import * as React from "react";
import {Tools} from "./panels/Tools";

class AppParams { }

class AppState { }

class App extends React.Component<AppParams, AppState> {
	constructor(props: AppParams) {
		super(props);
		this.state = {}
	}
	render() {
		var random = Math.random() > 0.5 ? <b>0</b> : <i>1</i>;
		return (
			<x-LinearLayout ui-flex="1">
				<Tools></Tools>
				<div>2</div>
				<div>3</div>
			</x-LinearLayout>
		)
	}
}

React.render(<App />, document.getElementsByTagName('body')[0]);