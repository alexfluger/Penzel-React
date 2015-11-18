export class Layer {
	visible: boolean = true;
	
	constructor(private name: string, private image: HTMLImageElement) {
		image.onload = (e) => {
			// console.log('loaded');
		}
	}
	
	draw(ctx: CanvasRenderingContext2D) {
		ctx.drawImage(this.image, 0, 0);
		// console.log('draw layer');
	}
	
	setImageData(data: string) {
		this.image.src = data;
	}
	
	getImageData() {
		return this.image.src;
	}

	getName() {
		return this.name;
	}
} 