/// <reference path="../../../typings/react/react.d.ts" />
import * as React from "react";
import {Tool} from "../tools/Tool";

class DrawingParams {
	activeTool: Tool;
}

class DrawingState { }

export class Drawing extends React.Component<DrawingParams, DrawingState> {
	container;
	back_canvas;
	mid_canvas;
	front_canvas;
	canvasCtx: CanvasRenderingContext2D;
	
	componentDidMount() {
		var w = this.container.clientWidth;
		var h = this.container.clientHeight;
		
		this.back_canvas.width = w;
		this.mid_canvas.width = w;
		this.front_canvas.width = w;
		this.back_canvas.height = h;
		this.mid_canvas.height = h;
		this.front_canvas.height = h;
		
		this.canvasCtx = this.mid_canvas.getContext('2d');
	}
	
	redraw() {
		// if we have layer drawn, store image data to that layer
		if (this.drawnLayerIdx > -1) {
			this.layers[this.drawnLayerIdx].setImageData(this.getImageData());
		} 
		// clear back canvas
		this._backCanvas.getContext('2d').clearRect(0, 0, this.canvas.width, this.canvas.height);
		this._backCanvas.getContext('2d').globalCompositeOperation = 'source-over';
		// put previous layers on back canvas
		for (var i = 0; i < this.currentLayerIdx; i++) {
			if (this.layers[i].visible) this.layers[i].draw(this._backCanvas.getContext('2d'));
		}
		// clear working canvas
		this.canvasCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.canvasCtx.globalCompositeOperation = 'source-over';
		// put current layer on working canvas
		if (this.layers[this.currentLayerIdx].visible) {
			// store index of drawn layer
			this.drawnLayerIdx = this.currentLayerIdx;
			// draw layer
			this.layers[this.currentLayerIdx].draw(this.canvasCtx);
		} else {
			// no layer drawn, so clear drawn layer index
			this.drawnLayerIdx = -1; 
		}
		// clear front canvas
		this._frontCanvas.getContext('2d').clearRect(0, 0, this.canvas.width, this.canvas.height);
		this._frontCanvas.getContext('2d').globalCompositeOperation = 'source-over';
		// put next layers on front canvas
		for (var i = this.currentLayerIdx + 1; i < this.layers.length; i++) {
			if (this.layers[i].visible) this.layers[i].draw(this._frontCanvas.getContext('2d'));
		}
	}
	
	onMouseMove(e) {
		if (this.props.activeTool) this.props.activeTool.update(this.canvasCtx, e.nativeEvent.offsetX, e.nativeEvent.offsetY);
	}

	onMouseUp(e) {
		if (this.props.activeTool) this.props.activeTool.stop(this.canvasCtx, e.nativeEvent.offsetX, e.nativeEvent.offsetY);
	}

	onMouseDown(e) {
		if (this.props.activeTool) this.props.activeTool.start(this.canvasCtx, e.nativeEvent.offsetX, e.nativeEvent.offsetY);
	}
	
	render() {
		return (
			<x-absolutelayout 
				ui-flex="1"
				ref={(c) => this.container = c}
			>
				<canvas id="back_canvas" ref={(c) => this.back_canvas = c}></canvas>
				<canvas id="mid_canvas" ref={(c) => this.mid_canvas = c}></canvas>
				<canvas
					id="front_canvas"
					ref={(c) => this.front_canvas = c}
					onMouseMove={this.onMouseMove.bind(this)}
					onMouseUp={this.onMouseUp.bind(this)}
					onMouseDown={this.onMouseDown.bind(this)}
				></canvas>
			</x-absolutelayout>
		);
	}
}