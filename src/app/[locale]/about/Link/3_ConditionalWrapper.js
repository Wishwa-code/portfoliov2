// conditionally wrap a component with another
export const ConditionalWrapper = ({ condition, wrapper, children }) => {
    return condition ? wrapper(children) : children
  }