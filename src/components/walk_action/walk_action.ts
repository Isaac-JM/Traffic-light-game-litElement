import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import style from './style_walk_action.scss?inline';

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
const sheet = new CSSStyleSheet();
sheet.replaceSync(style);

@customElement('walk-action')
export class WalkAction extends LitElement {

  @property({ type: Boolean })
  startGame = false

  constructor(){
    super()
  }

  protected firstUpdated(): void {
    this.shadowRoot!.adoptedStyleSheets = [sheet];
  }


  sendEvent(value:String){
    if(this.startGame===true){
    const event = new CustomEvent('walkAction', {
        detail: value,
        bubbles: true,
        composed: true
      });
      this.dispatchEvent(event);
    }
  }

  render() {
    return html`
      <div class="menu">
                <div style="${this.startGame===false?"background:gray; cursor:not-allowed":""}" class="option" @click=${()=>{this.sendEvent("left")}}><img src="src/assets/izquierda.png"  class="img"/></div>
                <div style="${this.startGame===false?"background:gray; cursor:not-allowed":""}" class="option" @click=${()=>{this.sendEvent("right")}}><img src="src/assets/derecha.png"  class="img"/></div>
      </div>
    `;
  }

  
}

declare global {
  interface HTMLElementTagNameMap {
    'walk-action': WalkAction
  }
}

