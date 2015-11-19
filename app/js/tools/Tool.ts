export interface Tool {
	start(ctx: CanvasRenderingContext2D, x: number, y: number, palette);
	update(ctx: CanvasRenderingContext2D, x: number, y: number, palette);
	stop(ctx: CanvasRenderingContext2D, x: number, y: number, palette);
	getName(): string;
	getIcon(): string;
	getOptions();
	getOptionsComponent();
}