import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import style from './style_home.scss?inline';
import '../../components/new_player/new_player'

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
const sheet = new CSSStyleSheet();
sheet.replaceSync(style);

@customElement('home-view')
export class HomeView extends LitElement {


  constructor(){
    super()
  }

  protected firstUpdated(): void {
    this.shadowRoot!.adoptedStyleSheets = [sheet];
  }

  

  render() {
    return html`
    <div class="container f-center">
      <new-player></new-player>
    </div>
    `;
  }

  

  
}

declare global {
  interface HTMLElementTagNameMap {
    'home-view': HomeView
  }
}


