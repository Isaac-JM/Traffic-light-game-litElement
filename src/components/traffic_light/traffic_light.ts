import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import style from './style_traffic_light.scss?inline';

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
const sheet = new CSSStyleSheet();
sheet.replaceSync(style);

@customElement('traffic-light')
export class TrafficLight extends LitElement {

    @property({ type: String })
    light = '/src/assets/rojo.png'

    @property({ type: Number })
    timeGreen = 0

    constructor() {
        super()
    }

    protected firstUpdated(): void {
        this.shadowRoot!.adoptedStyleSheets = [sheet];
    }


    changeLight(): void {

        this.light = "/src/assets/rojo.png", this.sendEvent("red")
        setTimeout(() => {
            this.light = "/src/assets/amarillo.png", this.sendEvent("green")
        }, 3000)
        setTimeout(() => {
            this.light = "/src/assets/verde.png", this.sendEvent("green")
        }, 3500)
        setTimeout(() => {
            this.light = "/src/assets/amarillo.png", this.sendEvent("green")
        }, (this.timeGreen+3500))
        setTimeout(() => {
            this.light = "/src/assets/rojo.png", this.sendEvent("red")
            this.changeLight()
        }, this.timeGreen+4000)



    }

    sendEvent(value: String) {
        const event = new CustomEvent('changeLight', {
            detail: value,
            bubbles: true,
            composed: true
        });
        this.dispatchEvent(event);
    }

    render() {
        return html`
            <img class="traffic-light" src="${this.light}">
    `;
    }


}

declare global {
    interface HTMLElementTagNameMap {
        'traffic-light': TrafficLight
    }
}

