/// <reference path="../../../typings/react/react.d.ts" />
import * as React from "react";
import {Tool} from "../tools/Tool";

class ToolOptionsProps {
	tool: Tool;
}

class ToolOptionsState { }

export class ToolOptions extends React.Component<ToolOptionsProps, ToolOptionsState> {
	onOptionsChanged(options) {
		console.log(options);
		this.props.tool.width = options.width;
		this.props.tool.linecap = options.linecap;
		this.forceUpdate();
	}
	
	render() {
		return (
			<x-linearlayout
				ui-orientation="vertical"
				style={{width: '250px', padding: '5px', borderTop: '1px solid black', borderBottom: '1px solid black'}}
			>
				<div>{this.props.tool.getName()} Options</div>
				{React.createElement(this.props.tool.getOptionsComponent(), {data: this.props.tool.getOptions(), onChange: this.onOptionsChanged.bind(this)})}
			</x-linearlayout>
		);
	}
}