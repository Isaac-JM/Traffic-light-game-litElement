import { LitElement, html } from 'lit'
import style from './style_new_player.scss?inline';
import { customElement } from 'lit/decorators.js';
/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
const sheet = new CSSStyleSheet();
sheet.replaceSync(style);

@customElement('new-player')
export class NewPlayer extends LitElement {

  static get properties() {
    return {
    }
  }



  constructor() {
    super()
    this.addEventListener('keyup', this.handleInputKeyUp.bind(this));
  }

  firstUpdated(){
    this.shadowRoot!.adoptedStyleSheets = [sheet];
  }

  handleInputKeyUp(event:any) {
    if (event.key === 'Enter') {
      this.newPlayer()
    }
  }

  
  newPlayer():void{
    const playerElement:any=this.shadowRoot!.getElementById("player")
    let player:string="";
    playerElement!=null?player=playerElement?.value:""

    let players=[]
    if(player!=""){
      localStorage.setItem("actualPlayer",player)
      const playersStore=localStorage.getItem("players")
      if( playersStore){
        players=JSON.parse(playersStore)
        if(players.find((res:any)=>res.name===player)==undefined){
          players.push({name:player,score:0,maxScore:0})
          localStorage.setItem("players",JSON.stringify(players))
        }
      }else{
        localStorage.setItem("players",JSON.stringify([{name:player,score:0,maxScore:0}]))
      }
        location.href="/game"
    }else{
        alert("Invalid user")
    }
   
  }

  render() {
    return html`
    <div class="container">
       <div class="f-center" style="padding:4px">
            <div style="width:100%,heigth:100%">

            </div>
                <img src="/src/assets/semaforos.png" style="width:40%; height:150px;"/>
            </div>
                  <div class="f-center" style="padding:2px">
                  <div>
                    <div class="f-center" >
                     <span class="text-new-player" >Create new player</span>
                    </div>
                    <div>
                      <input id="player" class="text-input-new-player" type="text" >
                    </div>
                    <div class="f-center">
                      <button @click="${this.newPlayer}" class="button-new-player">Join</button>
                    </div>
                  </div>
                </div>
            </div>
        </div>
    </div>
    `;
  }

  
}

declare global {
  interface HTMLElementTagNameMap {
    'new-player': NewPlayer
  }
}
