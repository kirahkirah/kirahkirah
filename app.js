class IconLink extends HTMLElement {
  constructor() {
    super()

    let hasError = false;

    let attributes = { href: '', title: '' };

    Object.keys(attributes).map(attribute => {
      try {
        if (!this.hasAttribute(attribute)) throw Error(`Attribute '${attribute}' is required for this custom element.`);
        else attributes[attribute] = this.getAttribute(attribute);
      } catch (e) {
        console.error(e);
        hasError = true;
      }
    });

    if (hasError) return;

    const [href, title] = Object.values(attributes);

    this.attachShadow({ mode: 'open' });
    const anchor = document.createElement('a');
    anchor.setAttribute('href', href);
    anchor.setAttribute('target', '_blank');

    const icon = anchor.appendChild(document.createElement('img'));
    icon.setAttribute('src', `assets/icons/${title.toLowerCase().replaceAll(' ', '')}.svg`);
    icon.setAttribute('alt', title);
    icon.setAttribute('title', title);

    this.shadowRoot.append(anchor);
  }
}

customElements.define('icon-link', IconLink);
