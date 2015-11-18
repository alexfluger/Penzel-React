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
				<div>Width: <input type="number" value={this.props.data.width} onChange={(e) => {this.updateData('width', e.target.value)}} /></div>
				<div>Line Cap:
					<select>
						<option>Butt</option>
						<option>Round</option>
						<option>Square</option>
					</select> 
				</div>
			</div>
		);
	}
}