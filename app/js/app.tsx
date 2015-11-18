/// <reference path="../../typings/react/react.d.ts" />
import * as React from "react";
import {Tools} from "./panels/Tools";
import {Drawing} from "./panels/Drawing";
import {Layers} from "./panels/Layers";
import {Palette} from "./panels/Palette";
import {ToolOptions} from "./panels/ToolOptions";
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
	
	onLayerChanged(idx: number, layer: Layer) {
		this.forceUpdate();
	}
	
	onLayerAdded() {
		this.state.layers.push(new Layer('New Layer', new Image));
		this.forceUpdate();
	}
	
	onLayerRemoved() {
		if (this.state.layers.length > 1) {
			this.state.layers.splice(this.state.layers.indexOf(this.state.activeLayer), 1);
			this.state.activeLayer = this.state.layers[0];
		} else {
			alert('Cannot Remove Last Layer');
		}
		this.forceUpdate();
	}
	
	onDrawingChanged(imageData: string) {
		this.state.activeLayer.setImageData(imageData, (e) => {
			this.forceUpdate();	
		});
	}
	
	render() {
		var random = Math.random() > 0.5 ? <b>0</b> : <i>1</i>;
		return (
			<x-linearlayout ui-flex="1">
				<x-linearlayout ui-orientation="vertical">
					<Tools 
						tools={this.state.tools}
						activeTool={this.state.activeTool}
						onToolChanged={this.onActiveToolChanged.bind(this)} 
					/>
					<Palette />
				</x-linearlayout>
				<Drawing
					activeTool={this.state.activeTool}
					layers={this.state.layers} 
					activeLayer={this.state.activeLayer}
					onChange={this.onDrawingChanged.bind(this)}
				/>
				<x-linearlayout ui-orientation="vertical">
					<Layers 
						layers={this.state.layers}
						activeLayer={this.state.activeLayer}
						onActiveLayerChanged={this.onActiveLayerChanged.bind(this)}
						onLayerChanged={this.onLayerChanged.bind(this)}
						onLayerAdded={this.onLayerAdded.bind(this)} 
						onLayerRemoved={this.onLayerRemoved.bind(this)} 
					/>
					<ToolOptions tool={this.state.activeTool} />
				</x-linearlayout>
			</x-linearlayout>
		)
	}
}

React.render(<App />, document.getElementsByTagName('body')[0]);