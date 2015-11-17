/// <reference path="../../../typings/react/react.d.ts" />
import * as React from "react";
import {Tool} from "../tools/Tool";

class ToolsParams {
	tools: Tool[];
	activeTool: Tool;
	onToolChanged;
}

class ToolsState { }

export class Tools extends React.Component<ToolsParams, ToolsState> {
	render() {
		var panelStyle = {
			background: 'lightgray'
		}
		var btnStyle = {
			width: '45px',
			height: '45px'
		}
		var buttons = [];
		this.props.tools.forEach((tool, idx) => {
			buttons.push(
				<button 
					key={idx}
					style={btnStyle}
					className={'fa fa-' + tool.getIcon() + (tool == this.props.activeTool ? ' selected' : '')}
					onClick={(e) => {this.props.onToolChanged(tool)}}
				>
				</button>
			);
		})
		
		return (
			<x-linearlayout style={panelStyle} ui-orientation="vertical">
				{buttons}
			</x-linearlayout>
		);
	}
}