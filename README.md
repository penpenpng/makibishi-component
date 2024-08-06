# makibishi-component

makibishi-component is an implementation of [MAKIBISHI](https://nikolat.github.io/makibishi-demo/) with [Web Component](https://developer.mozilla.org/en-US/docs/Web/API/Web_components). By placing this on your page, the page will be able to receive emoji reactions from any user.

Because it is on [Nostr protocol](https://nostr.com/), if a user visiting the page is a Nostr user, you can also know the identity of the user who reacted. However, it is not at all essential that the end-user be a Nostr user.

## Installation

Put the following code into your pages `<head>`. Note that you need to change the `VERSION` part as appropriate (e.g. `0.1.2`). Avalilable `VERSION`s are listed [here](https://www.npmjs.com/package/makibishi-component?activeTab=versions). [Release note](https://github.com/penpenpng/makibishi-component/releases) also may help you.

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/makibishi-component@VERSION/dist/default-theme.css"
/>
<script
  type="module"
  src="https://cdn.jsdelivr.net/npm/makibishi-component@VERSION/dist/makibishi-component.js"
></script>
```

Then, put the following code anywhere you want.

```html
<makibishi-component></makibishi-component>
```

## Customize behavior

`<makibishi-component>` accepts following attributes. Note that many attributes work reactively but not all do.

<dl>
  <dt>url</dt>
  <dd>The target URL to be reacted. If omitted, it will be the current location.</dd>

  <dt>relays</dt>
  <dd>The relay URLs separated by semicolon to which reactions are sent. It is recommended to set it, but if you are not sure, you can leave it blank.</dd>

  <dt>reaction</dt>
  <dd>An emoji that is sent by users' reaction. It can be an URL for custom reaction.</dd>

  <dt>displayed-reactions</dt>
  <dd>Maximum number of reactions displayed without being omitted.</dd>

  <dt>limit</dt>
  <dd>`limit` filter parameter to be sent to relays.</dd>

  <dt>If set, the reactions will be updated in real-time. For performance reasons, it is off by default.</dt>
  <dd>live</dd>

  <dt>disable-url-normalization</dt>
  <dd>If set, the URL will not be normalized automatically. Usually you shouldn't do this.</dd>

  <dt>hide-reaction-button</dt>
  <dd>If set, reaction button is hidden.</dd>

  <dt>hide-reaction-counter</dt>
  <dd>If set, reaction counter is hidden.</dd>

  <dt>hide-reaction-list</dt>
  <dd>If set, reaction contents and who made them are hidden.</dd>

  <dt>hide-reaction-content</dt>
  <dd>If set, emojis or custom reaction images are hidden.</dd>

  <dt>hide-avatar</dt>
  <dd>If set, avatar images are hidden.</dd>

  <dt>avatar-size</dt>
  <dd>Avatars' width and height. It will be set into img's attribute.</dd>

  <dt>custom-reaction-size</dt>
  <dd>Custom reactions' width and height. It will be set into img's attribute.</dd>

  <dt>require-sign-extension</dt>
  <dd>By default, when the user doesn't have NIP-07 extension, they react as an anonymous. But if the option is enabled, NIP-07 extension is required to send reaction.</dd>

  <dt>force-anonymous</dt>
  <dd>If set, send reaction as an anonymous user even if NIP-07 extension is found.</dd>

  <dt>custom-reaction-name</dt>
  <dd>If `reaction` attribute is URL, this is used to the custom reaction's name like `:star:`. Note that no colon is required.</dd>

  <dt>show-negative-reactions</dt>
  <dd>If set, negative reaction ('-') is allowed to be listed.</dd>

  <dt>positive</dt>
  <dd>A emoji displayed to express '+'.</dd>

  <dt>negative</dt>
  <dd>A emoji displayed to express '-'.</dd>
</dl>

## Customize appearance

You can use `reset.css` instead of `default-theme.css` and write your own CSS for complete control over appearance. The [default-theme implementation](https://github.com/penpenpng/makibishi-component/blob/main/public/default-theme.css) may be helpful.

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/makibishi-component@VERSION/dist/reset.css"
/>
```
