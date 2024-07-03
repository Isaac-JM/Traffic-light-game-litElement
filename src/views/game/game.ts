import { LitElement, PropertyValueMap, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import style from './style_game.scss?inline';
import '../../components/traffic_light/traffic_light'
import '../../components/walk_action/walk_action'
import '../../components/menu_start_logout/menu_start_logout'
import '../../components/score/score'


/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
const sheet = new CSSStyleSheet();
sheet.replaceSync(style);

@customElement('game-view')
export class GameView extends LitElement {

  @property({ type: String })
  light='red'

  @property({ type: String })
  lastWalk=''

  @property({ type: Number })
  score=0

  @property({ type: Number })
  maxScore=0

  @property({ type: Boolean })
  fail=false

  @property({ type: Number })
  timeGreen=this.getRandomTimeout()

  @property({ type: Boolean })
  startGame=false;


  constructor(){
    super()
    this.addEventListener("changeLight",(e:any)=>{this.light=e.detail})
    this.addEventListener("walkAction",(e:any)=>{this.scoreGame(e)})
    this.addEventListener("startGame",()=>{this.shadowRoot?.querySelector("traffic-light")!.changeLight(),this.startGame=true})
  }

  scoreGame(e:any):void{
    if(this.light==="green"){  
    if(e.detail===this.lastWalk){
        this.score--;
        this.fail=true
    }
    if(e.detail!=this.lastWalk){
        this.score++;
    }
    }else{
      this.score=0;
      this.fail=true;
    }
    this.score<0?this.score=0:""

    this.scoreGameLocalStorage(this.score)

    this.lastWalk=e.detail

  }

  scoreGameLocalStorage(score:Number):void{
    const playersString=String(localStorage.getItem("players"))

    let players=JSON.parse(playersString)

    players=players.map((res:any)=>{
      if(res.name===localStorage.getItem("actualPlayer")){
          this.maxScore=res.maxScore<score?score:res.maxScore
          return {
            name:res.name,
            score:score,
            maxScore:res.maxScore<score?score:res.maxScore
          }
      }
      return res
    })

    localStorage.setItem("players",JSON.stringify(players))

  }


  protected shouldUpdate(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): boolean {
     if(this.fail===true){
      setTimeout(()=>{this.fail=false},200)
    }
    return true
  }

  protected firstUpdated(): void {
    this.shadowRoot!.adoptedStyleSheets = [sheet];
    this.getScore()
  }


  getRandomTimeout(): number {
    const minTimeout = 2000;
    const maxTimeout = 10000 - this.score * 100;
    const randomRange = 1500;

    const randomOffset = (Math.random() * 2 - 1) * randomRange;

    const timeout = Math.max(maxTimeout + randomOffset, minTimeout);
    
    return timeout;
  }

  getScore():void{
    const playersString=String(localStorage.getItem("players"))

    let players=JSON.parse(playersString)

    players=players.map((res:any)=>{
      if(res.name===localStorage.getItem("actualPlayer")){
        this.maxScore=res.maxScore
        this.score=res.score
      }
    })
  }


  render() {

    this.timeGreen=this.getRandomTimeout()
    return html`
       <div class="container f-center">
          <div style="width:100vw">

          <div>
                <menu-start-logout ?startGame="${this.startGame}"></menu-start-logout>
          </div>
          <div class="f-center" style="padding:5px">
              <score-game  score=${this.maxScore} title="Maximum score!"></score-game>
          </div>
          <div class="f-center" style="padding:5px; margin-bottom:20px;">
              <score-game  score=${this.score} ?fail="${this.fail}" title="${localStorage.getItem("actualPlayer")}"></score-game>
          </div>

          <div class="f-center">
                 <traffic-light timeGreen="${this.timeGreen}" ></traffic-light>
          </div>
          <div>
                 <walk-action ?startGame="${this.startGame}"></walk-action>
          </div>

          

          
             
          </div>
       </div>
    `;
  }

  
}

declare global {
  interface HTMLElementTagNameMap {
    'game-view': GameView
  }
}

