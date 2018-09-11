export const template = (context, html) => html`
<style>
:host {
  display: none;
}

:host([open=true]),
:host(.closing) {
  display: block;
}
</style>
<slot></slot>
`;
