/// <reference path="../../typings/react/react.d.ts" />
import * as React from "react";
import {Tools} from "./panels/Tools";
import {Drawing} from "./panels/Drawing";
import {Layers} from "./panels/Layers";
import {Tool} from "./tools/Tool";
import {Pencil} from "./tools/Pencil";
import {Eraser} from "./tools/Eraser";
import {Layer} from "./Layer";

class AppParams { }

class AppState {
	layers: Layer[];
	activeLayer: Layer;
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
		var layers = [
			new Layer('Layer 1', new Image),
			new Layer('Layer 2', new Image)
		]
		this.state = {
			layers: layers,
			activeLayer: layers[0],
			tools: tools,
			activeTool: tools[0]			
		}
	}
	
	onActiveToolChanged(tool: Tool) {
		this.state.activeTool =  tool;
		this.forceUpdate();
	}
	
	onActiveLayerChanged(layer: Layer) {
		this.state.activeLayer = layer;
		this.forceUpdate();
	}
	
	render() {
		var random = Math.random() > 0.5 ? <b>0</b> : <i>1</i>;
		return (
			<x-linearlayout ui-flex="1">
				<Tools 
					tools={this.state.tools}
					activeTool={this.state.activeTool}
					onToolChanged={this.onActiveToolChanged.bind(this)} 
				/>
				<Drawing
					activeTool={this.state.activeTool} 
				/>
				<Layers 
					layers={this.state.layers}
					activeLayer={this.state.activeLayer}
					onLayerChanged={this.onActiveLayerChanged.bind(this)} 
				/>
			</x-linearlayout>
		)
	}
}

React.render(<App />, document.getElementsByTagName('body')[0]);