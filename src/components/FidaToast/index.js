import React from 'react'
import PropTypes from 'prop-types'
import { ToastContainer, style } from 'react-toastify'
import Transition from 'react-transition-group/Transition'
import { TOAST_LONG, TOAST_ANIMATION_DURATION } from '../../constants/ui.setup'

style({
  width: '320px',
  colorDefault: '#fff',
  colorInfo: '#368489',
  colorSuccess: '#4cd964',
  colorWarning: '#f1c40f',
  colorError: '#e74c3c',
  colorProgressDefault: 'linear-gradient(to right, #4cd964, #5ac8fa, #007aff, #34aadc, #5856d6, #ff2d55)',
  mobile: 'only screen and (max-width : 480px)',
  fontFamily: "'Istok Web', sans-serif", // eslint-disable-line
  zIndex: 9999,
  TOP_LEFT: {
    top: '1em',
    left: '1em',
  },
  TOP_CENTER: {
    top: '1em',
    marginLeft: `-${320 / 2}px`,
    left: '50%',
  },
  TOP_RIGHT: {
    top: '1em',
    right: '1em',
  },
  BOTTOM_LEFT: {
    bottom: '1em',
    left: '1em',
  },
  BOTTOM_CENTER: {
    bottom: '1em',
    marginLeft: `-${320 / 2}px`,
    left: '50%',
  },
  BOTTOM_RIGHT: {
    bottom: '1em',
    right: '1em',
  },
})

// Any transition created with react-transition-group/Transition will work !
const FadeInAndOut = ({ children, ...props }) => (
  <Transition
    {...props}
    timeout={TOAST_ANIMATION_DURATION}
    onEnter={node => node.classList.add('fadeInDownBig', 'animated')}
    onExit={node => {
      // node.classList.remove('fadeInLeft', 'animate')
      node.classList.add('fadeOutUpBig', 'animated')
    }}
  >
    {children}
  </Transition>
)

FadeInAndOut.propTypes = {
  children: PropTypes.object,
}

const FidaToast = () => <ToastContainer autoClose={TOAST_LONG} hideProgressBar transition={FadeInAndOut} />

export default FidaToast
