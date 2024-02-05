import React, { Component } from "react";
import Highlight from "react-highlight.js";
import ClipboardJS from 'clipboard';
import { initCodeViewer } from "@utils";

class CodeViewer extends Component {
  constructor(props) {
    super(props);
    this.elem = React.createRef();
  }
  state = {};

  componentDidMount() {
    const pre = this.elem.current.refs.code.parentElement;

    // add/remove class to pre tag
    pre.classList.add('collapsed');    
    pre.addEventListener('click', (e) => {
      e.target.classList.remove('collapsed');
    });

    // Add copy button
    var copyButton = document.createElement("BUTTON");              
    var copyButtonText = document.createTextNode("Copy");
    copyButton.appendChild(copyButtonText);
    copyButton.classList.add('btn', 'btn-sm', 'btn-primary', 'btn-copy')
    pre.appendChild(copyButton);

    // Clipboard
    new ClipboardJS(copyButton, {
      text: (trigger) => {
        return this.elem.current.props.children;
      }
    });
    
  }

  render() {
    return <div className="code-viewer">
      <Highlight ref={this.elem} {...this.props}>{this.props.children}</Highlight>
    </div>;
  }
}

export default CodeViewer;
