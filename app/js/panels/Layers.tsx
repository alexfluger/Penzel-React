/// <reference path="../../../typings/react/react.d.ts" />
import * as React from "react";
import {Layer} from "../Layer"

class LayersParams {
	layers: Layer[];
	activeLayer: Layer;
	onActiveLayerChanged;
	onLayerChanged;
	onLayerAdded;
	onLayerRemoved;
}

class LayersState { }

export class Layers extends React.Component<LayersParams, LayersState> {
	toggleLayerVisibility(idx: number) {
		let layer = this.props.layers[idx];
		layer.visible = !layer.visible;
		this.props.onLayerChanged(idx, layer);
	}
	
	selectLayer(layer) { }
	
	addLayer() { }
	
	render() {
		var layers = [];
		this.props.layers.forEach((layer, idx) => {
			var color = (layer == this.props.activeLayer ? 'gray' : 'white');
			layers.push(
				<x-linearlayout key={idx} style={{height: '50px', 'backgroundColor': color}}>
					<button 
						className={'fa fa-eye' + (layer.visible ? '' : '-slash')}
						onClick={(e) => {this.toggleLayerVisibility(idx)}}
						style={{width: '50px'}}
					/>
					<ui-text
						ui-flex="1"
						onClick={(e) => {this.props.onActiveLayerChanged(layer)}}
					>{layer.getName()}</ui-text>
				</x-linearlayout>
			);	
		});
		
		return (
			<x-linearlayout 
				ui-orientation="vertical"
				style={{'backgroundColor': 'lightgray', width: '250px', borderTop: '1px solid black', borderBottom: '1px solid black'}}
			>
				<div>Layers</div>
				{layers} 
				<x-linearlayout>
					<button className={'fa fa-plus'} style={{margin: '10 10 10 0', width: 32, height: 32}} onClick={(e) => {this.props.onLayerAdded()}} />
					<button className={'fa fa-minus'} style={{margin: '10 10 10 0', width: 32, height: 32}} onClick={(e) => {this.props.onLayerRemoved()}} />
				</x-linearlayout>
			</x-linearlayout>
		);
	}
}