/// <reference path="../../../typings/react/react.d.ts" />
import * as React from "react";
import {Tool} from './Tool';

export class Pencil implements Tool {
	protected state: string = 'up';
	private color: String = '#00000000';
	public width: number = 10;
	
	start(ctx: CanvasRenderingContext2D, x: number, y: number) {
		if (!ctx) return;
		this.state = 'down',
		ctx.lineWidth = this.width;
		ctx.strokeStyle = this.color;
		ctx.globalCompositeOperation = 'source-over';
		ctx.beginPath();
		ctx.moveTo(x, y);
	}
	
	update(ctx: CanvasRenderingContext2D, x: number, y: number) {
		if (!ctx) return;
		if (this.state == 'down') {
			ctx.lineTo(x, y);
			ctx.stroke();
		}
	}
	
	stop(ctx: CanvasRenderingContext2D, x: number, y: number) {
		if (!ctx) return;
		this.state = 'up',
		ctx.lineTo(x, y);
		ctx.stroke();
		ctx.closePath();
	}
	
	getName() {
		return 'Brush';
	}
	
	getIcon() {
		return 'paint-brush';
	}
	
	getOptionsComponent() {
		return (
			<div>
				<div>Width: <input type="number" value={this.width} /></div>
				<div>Line Cap:
					<select>
						<option>Butt</option>
						<option>Round</option>
						<option>Square</option>
					</select> 
				</div>
			</div>
		)
	}
}