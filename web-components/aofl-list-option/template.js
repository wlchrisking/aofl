import {html} from '@polymer/lit-element';

export const template = (context) => html`
<style>
:host {
  display: block;
}
</style>
<div on-click="${() => context._select()}">
  <slot></slot>
</div>
`;