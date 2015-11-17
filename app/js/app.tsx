/// <reference path="../../typings/react/react.d.ts" />
import * as React from "react";
import {Tools} from "./panels/Tools";
import {Tool} from "./tools/Tool";
import {Pencil} from "./tools/Pencil";
import {Eraser} from "./tools/Eraser";

class AppParams { }

class AppState {
	tools: Tool[];
	activeTool: Tool;
}

class App extends React.Component<AppParams, AppState> {
	constructor(props: AppParams) {
		super(props);
		var tools = [
			new Pencil(),
			new Eraser()
		]
		this.state = {
			tools: tools,
			activeTool: tools[0]			
		}
	}
	
	onToolChanged(tool: Tool) {
		console.log(this);
		this.state.activeTool =  tool;
		this.forceUpdate();
	}
	
	render() {
		var random = Math.random() > 0.5 ? <b>0</b> : <i>1</i>;
		return (
			<x-LinearLayout ui-flex="1">
				<Tools tools={this.state.tools} activeTool={this.state.activeTool} onToolChanged={this.onToolChanged.bind(this)}></Tools>
				<div>2</div>
				<div>3</div>
			</x-LinearLayout>
		)
	}
}

React.render(<App />, document.getElementsByTagName('body')[0]);