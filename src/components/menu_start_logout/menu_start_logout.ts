import { LitElement, html } from 'lit'
import style from './style_menu_start_logout.scss?inline';
import { customElement,property } from 'lit/decorators.js'
/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
const sheet = new CSSStyleSheet();
sheet.replaceSync(style);


@customElement('menu-start-logout')
export class  MenuStartLogout extends LitElement {

  @property({ type: Boolean })
    startGame = false

  constructor() {
    super()

  }

  firstUpdated(){
    this.shadowRoot!.adoptedStyleSheets = [sheet];
  }


  logout=()=>{
    location.href="/home"
  }


  start(){
    if(this.startGame===false){
    const event = new CustomEvent('startGame', {
        bubbles: true,
        composed: true
      });
      this.dispatchEvent(event);
    }
  }

  render() {
    return html`
            <div class="menu">
                <div><button style="${this.startGame?"cursor:not-allowed;background:gray":"cursor:pointer"}" class="start" @click="${this.start}" >Start</button></div>
                <div class="option" @click="${this.logout}"><img src="src/assets/logout.png"  class="img"/></div>
            </div>
    `;
  }

  
}

declare global {
  interface HTMLElementTagNameMap {
    'menu-start-logout': MenuStartLogout
  }
}
