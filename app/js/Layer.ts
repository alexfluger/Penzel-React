export class Layer {
	visible: boolean = true;
	
	constructor(private name: string, private image: HTMLImageElement) {
	}
	
	draw(ctx: CanvasRenderingContext2D) {
		ctx.drawImage(this.image, 0, 0);
	}
	
	setImageData(data: string, cb) {
		this.image.onload = (e) => {
			cb(e);
			this.image.onload = null;
		}
		this.image.src = data;
	}
	
	getImageData() {
		return this.image.src;
	}

	getName() {
		return this.name;
	}
} 