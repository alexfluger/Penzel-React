export class Layer {
	visible: boolean = true;
	
	constructor(private name: string, private image: HTMLImageElement) {
		
	}
	
	draw(ctx: CanvasRenderingContext2D) {
		ctx.drawImage(this.image, 0, 0);
	}
	
	setImageData(data: string) {
		this.image.src = data;
	}

	getName() {
		return this.name;
	}
} 