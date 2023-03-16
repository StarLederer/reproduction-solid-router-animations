import type { ParentComponent } from 'solid-js'
import router from './core'

const Main: ParentComponent<{
  href: string;
  role?: "button";
}> = props => (
  <a
    {...props}
    onClick={(ev) => {
      ev.preventDefault()
      router.navigate(props.href.split("/").filter(Boolean));
    }}
  >
    {props.children}
  </a>
)

export default Main
