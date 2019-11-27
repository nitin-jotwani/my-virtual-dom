import { renderVDOM } from './vDOM';

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
export const renderComponent = (component, parent) => {
  const oldBase = component.base
  component.base = renderVDOM(
    component.render(component.props, component.state)
  )

  if (parent) {
    parent.appendChild(component.base)
  } else {
    oldBase.parentNode.replaceChild(component.base, oldBase)
  }
}