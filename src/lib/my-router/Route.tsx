import type { ParentComponent } from 'solid-js'
import type { RouteProps } from './core/Route'
import Route from './core/Route'

const Main: ParentComponent<Omit<RouteProps, 'path'> & {
  path: string
}> = props => (
  <Route
    path={props.path.split('/').filter(Boolean)}
    strict={props.strict}
    class="my-routue"
    enter="animate-in"
    leave="animate-out"
  >
    {props.children}
  </Route>
)

export default Main
