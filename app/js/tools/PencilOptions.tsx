/// <reference path="../../../typings/react/react.d.ts" />
import * as React from "react";

class PencilOptionsProps { 
	data;
	onChange;
}

class PencilOptionsState { }

export class PencilOptions extends React.Component<PencilOptionsProps, PencilOptionsState> {
	
	updateData(prop: string, val: any) {
		this.props.data[prop] = val;
		this.props.onChange(this.props.data);
	}
	
	render() {
		return (
			<div>
				<div>Width: <input type="range" min="0" max="100" value={this.props.data.width} onChange={(e) => {this.updateData('width', e.target.value)}} /></div>
				<div>Line Cap:
					<select value={this.props.data.linecap} onChange={(e) => {this.updateData('linecap', e.target.value)}}>
						<option value="butt">Butt</option>
						<option value="round">Round</option>
						<option value="square">Square</option>
					</select> 
				</div>
			</div>
		);
	}
}