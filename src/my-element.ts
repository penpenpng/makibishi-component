import { component } from "haunted";
import { html } from "lit";

const MyElement = (props: { name: string }) => {
  return html`Hello, ${props.name}`;
};

customElements.define(
  "my-element",
  component(MyElement, { observedAttributes: ["name"] }),
);
