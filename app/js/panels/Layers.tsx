/// <reference path="../../../typings/react/react.d.ts" />
import * as React from "react";
import {Layer} from "../Layer"

class LayersParams {
	layers: Layer[];
	activeLayer: Layer;
	onLayerChanged;
}

class LayersState { }

export class Layers extends React.Component<LayersParams, LayersState> {
	toggleLayerVisibility(layer: Layer) {
		layer.visible = !layer.visible;
		this.forceUpdate();
	}
	
	selectLayer(layer) { }
	
	addLayer() { }
	
	render() {
		var layers = [];
		this.props.layers.forEach((layer, idx) => {
			var color = (layer == this.props.activeLayer ? 'gray' : 'white');
			layers.push(
				<x-linearlayout key={idx} style={{height: '50px', 'background-color': color}}>
					<button 
						className={'fa fa-eye' + (layer.visible ? '' : '-slash')}
						onClick={(e) => {this.toggleLayerVisibility(layer)}}
						style={{width: '50px'}}
					></button>
					<ui-text
						ui-flex="1"
						onClick={(e) => {this.props.onLayerChanged(layer)}}
					>{layer.getName()}</ui-text>
				</x-linearlayout>
			);	
		});
		
		return (
			<x-linearlayout 
				ui-orientation="vertical"
				style={{'background-color': 'lightgray', width: '250px'}}
			>
				<div>Layers</div>
				{layers} 
				<button onClick={(e) => {this.addLayer()}}>Add</button>
			</x-linearlayout>
		);
	}
}