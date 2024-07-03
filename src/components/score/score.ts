import { LitElement, PropertyValueMap, html } from 'lit'
import style from './style_score.scss?inline';
import { customElement,property } from 'lit/decorators.js'
/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
const sheet = new CSSStyleSheet();
sheet.replaceSync(style);


@customElement('score-game')
export class  ScoreGame extends LitElement {

  @property({ type: Number })
    score = 0

  @property({ type: Boolean })
    fail = false

  @property({ type: String })
    title = ""

  constructor() {
    super()

  }

  firstUpdated(){
    this.shadowRoot!.adoptedStyleSheets = [sheet];
  }

  protected shouldUpdate(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): boolean {
      if(this.fail===true){
        setTimeout(()=>{this.fail=false},100)
      }
    return true
  }



  render() {
    return html`
            <div class="f-center">
                <span class="user">${this.title}</span>
            </div>
            <div class="${this.fail?"score-fail":"score"}">
                ${this.score}
            </div>
    `;
  }

  
}

declare global {
  interface HTMLElementTagNameMap {
    'score-game': ScoreGame
  }
}
