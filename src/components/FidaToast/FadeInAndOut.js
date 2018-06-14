import React from 'react'
import PropTypes from 'prop-types'
import Transition from 'react-transition-group/Transition'
import { TOAST_ANIMATION_DURATION } from '../../constants/ui.setup'

export const fadeIn = node => node.classList.add('fadeInDownBig', 'animated')
export const fadeOut = node => node.classList.add('fadeOutUpBig', 'animated')

// Any transition created with react-transition-group/Transition will work !
const FadeInAndOut = ({ children, ...props }) => (
  <Transition {...props} timeout={TOAST_ANIMATION_DURATION} onEnter={fadeIn} onExit={fadeOut}>
    {children}
  </Transition>
)

FadeInAndOut.propTypes = {
  children: PropTypes.object,
}

export default FadeInAndOut
