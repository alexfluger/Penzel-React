/// <reference path="../../../typings/react/react.d.ts" />
import * as React from "react";

class PaletteProps {
	color: string;
	onChange;
}

class PaletteState { }

export class Palette extends React.Component<PaletteProps, PaletteState> {
	render() {
		return (
			<input
				style={{width: '45px', height: '45px'}}
				type="color" 
				value={this.props.color}
				onChange={this.props.onChange}
			/>
		);
	}
}