/// <reference path="../../../typings/react/react.d.ts" />
import * as React from "react";

class EraserOptionsProps { 
	data;
	onChange;
}

class EraserOptionsState { }

export class EraserOptions extends React.Component<EraserOptionsProps, EraserOptionsState> {
	
	updateData(prop: string, val: any) {
		this.props.data[prop] = val;
		this.props.onChange(this.props.data);
	}
	
	render() {
		return (
			<div>
				<div>Width: <input type="range" min="0" max="100" value={this.props.data.width} onChange={(e) => {this.updateData('width', e.target.value)}} /></div>
			</div>
		);
	}
}