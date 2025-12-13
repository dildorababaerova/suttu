import { forwardRef, useImperativeHandle, useState } from 'react'

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideVisible = { display: visible ? 'none' : '' }
  const showVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(prev => !prev)
  }

  // 🔥 обязательно добавить [] чтобы не было "Timed out waiting for mutation"
  useImperativeHandle(ref, () => ({
    toggleVisibility
  }), [])

  return (
    <div>
      <div style={hideVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>

      <div style={showVisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
})

export default Togglable
