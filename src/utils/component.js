import { renderVDOM } from './vDOM';
import { diff } from './diffing';
export class Component {
  constructor(props) {
    this.props = props
    this.state = {}
  }

  setState(state) {
    this.state = Object.assign({}, state)
    renderComponent(this)
  }
}

// renderComponent: It grabs the old base(current DOM before change that is saved in component.base)
export const renderComponent = (component) => {
  let rendered = component.render(component.props, component.state); // gives us virtual dom
  // const oldBase = component.base
  component.base = diff(component.base, rendered)

  // if (parent) {
  //   // console.log('if parent: ', parent)
  //   parent.appendChild(component.base)
  // } else {
  //   // console.log('no parent:', oldBase.parentNode)
  //   oldBase.parentNode.replaceChild(component.base, oldBase)
  // }
}