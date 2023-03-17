import type { Component } from 'solid-js'
import { Outlet } from '@solidjs/router'
import { Transition } from 'solid-transition-group'

const style = 'animation-duration-m.4'

const Main: Component = () => (
  <Transition appear enterActiveClass={`${style} animate-in`} exitActiveClass={`${style} animate-out`}>
    <Outlet />
  </Transition>
)

export default Main
