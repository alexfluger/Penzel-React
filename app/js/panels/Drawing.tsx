/// <reference path="../../../typings/react/react.d.ts" />
import * as React from "react";
import {Tool} from "../tools/Tool";
import {Layer} from "../Layer";

class DrawingProps {
	activeTool: Tool;
	layers: Layer[]
	activeLayer: Layer;
	onChange;
	palette;
}

class DrawingState { }

export class Drawing extends React.Component<DrawingProps, DrawingState> {
	container;
	back_canvas;
	mid_canvas;
	front_canvas;
	canvasCtx: CanvasRenderingContext2D;
	drawnLayerIdx: number = -1;
	
	componentDidMount() {
		var w = this.container.clientWidth;
		var h = this.container.clientHeight;
		
		this.front_canvas.setAttribute('touch-action', 'none');
    	this.front_canvas.addEventListener('pointerdown', this.onMouseDown.bind(this));
    	this.front_canvas.addEventListener('pointermove', this.onMouseMove.bind(this));
    	this.front_canvas.addEventListener('pointerup', this.onMouseUp.bind(this));
		
		this.back_canvas.width = w;
		this.mid_canvas.width = w;
		this.front_canvas.width = w;
		this.back_canvas.height = h;
		this.mid_canvas.height = h;
		this.front_canvas.height = h;
		
		this.canvasCtx = this.mid_canvas.getContext('2d');

		
		this.redraw();
	}
	
	componentWillUnmount() {
    	this.front_canvas.removeEventListener('pointerdown', this.onMouseDown.bind(this));
    	this.front_canvas.removeEventListener('pointermove', this.onMouseMove.bind(this));
    	this.front_canvas.removeEventListener('pointerup', this.onMouseUp.bind(this));
  	}
	
	componentDidUpdate() {
		this.redraw();
	}
	
	getImageData() {
		return this.mid_canvas.toDataURL();
	}
	
	redraw() {
		// clear back canvas
		this.back_canvas.getContext('2d').clearRect(0, 0, this.back_canvas.width, this.back_canvas.height);
		this.back_canvas.getContext('2d').globalCompositeOperation = 'source-over';
		// clear working canvas
		this.canvasCtx.clearRect(0, 0, this.mid_canvas.width, this.mid_canvas.height);
		this.canvasCtx.globalCompositeOperation = 'source-over';
		// clear front canvas
		this.front_canvas.getContext('2d').clearRect(0, 0, this.front_canvas.width, this.front_canvas.height);
		this.front_canvas.getContext('2d').globalCompositeOperation = 'source-over';
		// put layers on canvases
		var currentCanvas = this.back_canvas;
		for (var i = 0; i < this.props.layers.length; i++) {
			if (this.props.layers[i] == this.props.activeLayer) {
				if (this.props.layers[i].visible) {
					this.drawnLayerIdx = i;
					this.props.layers[i].draw(this.mid_canvas.getContext('2d'));
				} else {
					this.drawnLayerIdx = -1;
				}
				currentCanvas = this.front_canvas;
			} else if (this.props.layers[i].visible) {
				this.props.layers[i].draw(currentCanvas.getContext('2d'));
			}
		}
	}
	
	onMouseMove(e) {
		if (this.props.activeTool) this.props.activeTool.update(this.canvasCtx, e.x - 45, e.y, this.props.palette);
	}

	onMouseUp(e) {
		if (this.props.activeTool) this.props.activeTool.stop(this.canvasCtx, e.x - 45, e.y, this.props.palette);
		this.props.onChange(this.getImageData());
	}

	onMouseDown(e) {
		if (this.props.activeTool) this.props.activeTool.start(this.canvasCtx, e.x - 45, e.y, this.props.palette);
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
				></canvas>
			</x-absolutelayout>
		);
	}
}