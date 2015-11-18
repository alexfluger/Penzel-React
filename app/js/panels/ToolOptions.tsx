/// <reference path="../../../typings/react/react.d.ts" />
import * as React from "react";
import {Tool} from "../tools/Tool";

class ToolOptionsProps {
	tool: Tool;
}

class ToolOptionsState { }

export class ToolOptions extends React.Component<ToolOptionsProps, ToolOptionsState> {
	render() {
		return (
			<x-linearlayout
				ui-orientation="vertical"
				style={{'backgroundColor': 'lightgray', width: '250px', borderTop: '1px solid black', borderBottom: '1px solid black'}}
			>
				<div>{this.props.tool.getName()} Options</div>
				{this.props.tool.getOptionsComponent()}
			</x-linearlayout>
		);
	}
}