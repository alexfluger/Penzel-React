/// <reference path="../../typings/react/react.d.ts" />
import * as React from "react";
import {Tools} from "./panels/Tools";
import {Drawing} from "./panels/Drawing";
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
		this.state.activeTool =  tool;
		this.forceUpdate();
	}
	
	render() {
		var random = Math.random() > 0.5 ? <b>0</b> : <i>1</i>;
		return (
			<x-linearlayout ui-flex="1">
				<Tools tools={this.state.tools} activeTool={this.state.activeTool} onToolChanged={this.onToolChanged.bind(this)} />
				<Drawing activeTool={this.state.activeTool} />
				<div>3</div>
			</x-linearlayout>
		)
	}
}

React.render(<App />, document.getElementsByTagName('body')[0]);