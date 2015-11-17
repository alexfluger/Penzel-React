/// <reference path="../../../typings/react/react.d.ts" />
import * as React from "react"

class ToolsParams {
	active;
}

class ToolsState { }

export class Tools extends React.Component<ToolsParams, ToolsState> {
	render() {
		var btnStyle = {
			width: '45px',
			height: '45px'
		}
		return (
			<x-linearlayout ui-orientation="vertical">
				<button style={btnStyle}></button>
				<button style={btnStyle}></button>
				<button style={btnStyle}></button>
				<button style={btnStyle}></button>
			</x-linearlayout>
		);
	}
}