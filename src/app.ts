import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { Router } from '@vaadin/router';
import './views/home/home'
import './views/game/game'
/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('app-view')
export class AppView extends LitElement {
  // /**
  //  * Copy for the read the docs hint.
  //  */
  // @property()
  // docsHint = 'Click on the Vite and Lit logos to learn more'

  // /**
  //  * The number of times the button has been clicked.
  //  */
  // @property({ type: Number })
  // count = 0


  protected firstUpdated(): void {
    const router = new Router(this.shadowRoot!.querySelector('#outlet'));
    router.setRoutes([
      { path: '/home', component: 'home-view' },
      { path: '/game', component: 'game-view' },
      { path: '(.*)', redirect: '/home' },
    ]);

  }


  render() {
    return html`
          <div id="outlet"></div> 
    `
  }



  static styles = css``
}

declare global {
  interface HTMLElementTagNameMap {
    'app-view': AppView
  }
}
