import { ParentComponent, Component, For, JSXElement } from 'solid-js';
import { A, memoryIntegration, Route, Router, Routes } from '@solidjs/router';
import Outlet from './lib/solid-rotuer/Outlet';
import { Route as MyRoute, A as MyA } from './lib/my-router';
import myRotuer from './lib/my-router/core';

const styles = {
  route: "position: absolute; inset: 0; overflow: auto;",
  routeWrapper: "position: relative; flex: 1; overflow: hidden;",
  page: "margin: 0; display: flex; flex-direction: column; text-align: center; align-items: center; justify-content: center; padding: var(--spacing)"
}

const Home: ParentComponent<{
  cta: JSXElement
}> = (props) => (
  <article style={`${styles.route} ${styles.page}`}>
    <h2>Homepage</h2>
    <p>This is the homepage</p>
    {props.cta}
  </article>
)

const Page: ParentComponent<{
  subject: string
}> = (props) => (
  <article style={`${styles.route} ${styles.page}`}>
    <h2>Page about {props.subject}</h2>
    <p>This is a page that describes {props.subject} in detail</p>
  </article>
)

const LayoutWithAside: ParentComponent<{
  items: JSXElement[]
}> = (props) => (
  <div style={`${styles.route} display: flex;`}>
    <aside style="padding: var(--spacing); border-inline-end: 1px solid var(--muted-border-color)">
      <nav>
        <ul>
          <For each={props.items}>
            {(item) => <li style="text-transform: capitalize">{item}</li>}
          </For>
        </ul>
      </nav>
    </aside>
    <div style={styles.routeWrapper}>
      {props.children}
    </div>
  </div>
)

const LayoutWithBar: ParentComponent<{
  items: JSXElement[]
}> = (props) => (
  <div style={`${styles.route} display: flex; flex-direction: column`}>
    <nav style="padding-inline: var(--spacing); border-block-end: 1px solid var(--muted-border-color)">
      <ul>
        <For each={props.items}>
          {(item) => <li style="text-transform: capitalize">{item}</li>}
        </For>
      </ul>
    </nav>
    <div style={styles.routeWrapper}>
      {props.children}
    </div>
  </div>
)

const content = {
  subjects: ["this", "that", "thot"]
}

const AppWithSolidRotuer: Component = () => (
  <div style="position: relative;">
    <Router source={memoryIntegration()}>
      <Routes>
        <Route path="/" element={
          <LayoutWithBar items={[
            <A href="/">Home</A>,
            <A href="/category">Categories</A>,
          ]}>
            <Outlet />
          </LayoutWithBar>
        }>
          <Route path="/*" element={<Home cta={<A role="button" href={`/category/that`}>Get started</A>} />}></Route>
          <Route path="category/*" element={
            <LayoutWithAside items={
              content.subjects.map(subj => <A href={`/category/${subj}`}>{subj}</A>)
            }>
              <Outlet />
            </LayoutWithAside>
          }>
            <Route path="/" element="" />
            <For each={content.subjects}>
              {(subj) => (
                <Route path={subj} element={<Page subject={subj} />} />
              )}
            </For>
          </Route>
        </Route>
      </Routes>
    </Router>
  </div>
)

const AppWithMyRotuer: Component = () => (
  <div style="position: relative;">
    <MyRoute path="/">
      <LayoutWithBar items={[
        <MyA href="/home">Home</MyA>,
        <MyA href="/category">Categories</MyA>,
      ]}>
        <MyRoute path="/home">
          <Home cta={<MyA role="button" href={`/category/that`}>Get started</MyA>} />
        </MyRoute>
        <MyRoute path="/category">
          <LayoutWithAside items={[
            content.subjects.map(subj => <MyA href={`/category/${subj}`}>{subj}</MyA>)
          ]}>
            <For each={content.subjects}>
              {(item) => (
                <MyRoute path={`/category/${item}`}>
                  <Page subject={item} />
                </MyRoute>
              )}
            </For>
          </LayoutWithAside>
        </MyRoute>
      </LayoutWithBar>
    </MyRoute>
  </div>
)

const Main: Component = () => {
  myRotuer.navigate(["home"])

  return (
    <div style="block-size: 100%; display: flex; flex-direction: column;">
      <div style="margin-block: var(--typography-spacing-vertical); text-align: center">
        <h1 style="margin: 0;">Router comparison</h1>
        <p>@solidjs/rotuer + solid-transition-group <strong>VS</strong> my router with baked in animation support</p>
      </div>
      <div style="block-size: 1px; flex-shrink: 0; background: var(--muted-color)" />
      <main style="flex: 1; display: grid; grid-template-columns: 1fr 1px 1fr;">
        <AppWithSolidRotuer />
        <div style="background: var(--muted-color)" />
        <AppWithMyRotuer />
      </main>
    </div >
  );
};

export default Main;
