/// <reference path="../../../typings/react/react.d.ts" />
import * as React from "react";
import {Layer} from "../Layer"

class LayersParams {
	layers: Layer[];
}

class LayersState { }

export class Layers extends React.Component<LayersParams, LayersState> {
	toggleLayerVisibility(idx) {
		
	}
	
	selectLayer(layer) {
		
	}
	
	addLayer() {}
	
	render() {
		var layers = [];
		this.props.layers.forEach((layer, idx) => {
			layers.push(
				<x-linearlayout key={idx} style={{height: '50px'}}>
					<button 
						className={'fa fa-eye' + (layer.visible ? '' : '-slash')}
						onClick={(e) => {this.toggleLayerVisibility(layer)}}
						style={{width: '50px'}}
					></button>
					<div
						ui-flex="1"
						onClick={(e) => {this.selectLayer(layer)}}
					>{layer.getName()}</div>
				</x-linearlayout>
			);	
		});
		
		return (
			<x-linearlayout 
				ui-orientation="vertical"
				style={{'background-color': 'lightgray', width: '250px'}}
			>
				<div
					
				>Layers</div>
				{layers} 
				<button onClick={(e) => {this.addLayer()}}>Add</button>
			</x-linearlayout>
		);
	}
}