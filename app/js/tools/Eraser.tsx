/// <reference path="../../../typings/react/react.d.ts" />
import * as React from "react";
import {Pencil} from './Pencil';

export class Eraser extends Pencil {

	start(ctx: CanvasRenderingContext2D, x: number, y: number) {
		if (!ctx) return;
		this.state = 'down',
		ctx.lineWidth = this.width;
		ctx.globalCompositeOperation = 'destination-out';
		ctx.beginPath();
		ctx.moveTo(x, y);
	}
	
	getName() {
		return 'Eraser';
	}
	
	getIcon() {
		return 'eraser';
	}

	getOptionsComponent() {
		return (
			<div>Width: <input type="number" value={this.width} /></div>
		)
	}

}