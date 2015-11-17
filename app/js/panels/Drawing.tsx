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