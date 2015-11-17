export interface Tool {
	start(ctx: CanvasRenderingContext2D, brush: Object, x: number, y: number);
	update(ctx: CanvasRenderingContext2D, brush: Object, x: number, y: number);
	stop(ctx: CanvasRenderingContext2D, brush: Object, x: number, y: number);
	getName(): string;
	getIcon(): string;
	getOptionsComponent();
}