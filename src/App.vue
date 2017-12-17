<template>
<section id ="app">
<!---vimeo modal-->

    <div id="modal" class="modal-video">
        <div class="close"><a href="#close"><i class="material-icons tx">highlight_off</i></a></div>
        <iframe class="iframe" src="https://player.vimeo.com/video/207691405" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen align="middle"></iframe>
    </div>

    <!-- The input -->
    <div id="wrapper-1">
<div class="query">
        <div id="img-avatar-container">
            <img class="img-avatar"src="../img/avatar-ada.png" alt="ada imagen del asistente">
        </div>
        <div class="wrapper" id="entry-s" v-if="micro == false">
            <i class="material-icons iicon" id="mic" @click="microphone(true)">mic</i>
            <input aria-label="Ask me something" autocomplete="off" v-model="query" class="queryform" @keyup.enter="submit()" placeholder="Ask me something..." autofocus type="text">
            <i class="material-icons iicon t2s" @click="mute(true)" v-if="muted == false">volume_up</i>
            <i class="material-icons iicon t2s" @click="mute(false)" v-else>volume_off</i>
        </div>
        <div class="wrapper" v-else>
            <i class="material-icons iicon recording" @click="microphone(false)">mic</i><input class="queryform" :placeholder="speech" readonly>   
        </div>
    </div>
     <main class="wrapper ai-window">

        <br>
        <br>

        <!-- Display Welcome Message -->
        <div v-if="answers.length == 0 && online == true">
            <h1 class="title mdc-typography--headline">
                <div class="material-icons up">arrow_upward</div>
                <br>
                <br>
                    Hello, ask something to get started

                    <p class="mdc-typography--body2">You can type "Hello" for example. Or just press on the microphone to talk</p>
            </h1>
        </div>

        <!-- Display offline message -->
        <div v-if="answers.length == 0 && online == false">
            <h1 class="title mdc-typography--headline">
                <div class="material-icons up">cloud_off</div>
                <br>
                <br>
                    Oh, no!

                    <p class="mdc-typography--body2">It looks like you are not connected to the internet, this webpage <b>requires</b> internet connection, to process your requests</p>
            </h1>
        </div>

        <!-- Chat window -->
        <table v-for="a in answers" class="chat-window">

            <!-- Your messages -->
            <tr id="your-m">
                <td class="bubble">{{a.result.resolvedQuery}}</td>
            </tr>

            <!-- Dialogflow messages -->
            <tr id="bot-m">
                <td>

                    <!-- Bot message types / Speech -->

                    <div v-if="a.result.fulfillment.speech" class="bubble bot">
                        {{a.result.fulfillment.speech}}
                    </div>

                    <!-- Google Assistant output -->
                    <div v-for="r in a.result.fulfillment.messages">

                    <!-- Google text normal -->
                        <div v-if="r.type == 'simple_response'" class="bubble gb">
                            {{r.displayText}}
                            {{r.textToSpeech}}
                        </div>

                        <!-- Bot message types / Card -->

                        <div class="mdc-card" v-if="r.type == 'basic_card'">
                            <img :title="r.image.accessibilityText" :alt="r.image.accessibilityText" class="mdc-card__media-item" :src="r.image.url" v-if="r.image">
                            <section class="mdc-card__primary">
                                <h1 class="mdc-card__title mdc-card__title">{{r.title}}</h1>
                                <br>
                                <h2 class="mdc-card__subtitle">{{r.subtitle}}</h2>
                            </section>
                            <section class="mdc-card__supporting-text">
                                {{r.formattedText}}
                            </section>
                            <section class="mdc-card__actions" v-for="button in r.buttons">
                                <a class="mdc-button mdc-button--compact mdc-button--primary mdc-card__action" id="enla" target="" :href="button.openUrlAction.url" >{{button.title}} <i class="material-icons openlink">open_in_new</i></a>
                            </section>
                        </div>

                        <!-- Bot message types / Carousel Card -->

                        <div class="slider" v-if="r.type == 'carousel_card'">
                            <carousel 
                                    :perPage="1" 
                                    :navigationEnabled="true"
                                    :paginationEnabled="false"
                                    navigationNextLabel="<button class='mdc-fab material-icons rightnav'><span class='mdc-fab__icon'>keyboard_arrow_right</span></button>"
                                    navigationPrevLabel="<button class='mdc-fab material-icons leftnav'><span class='mdc-fab__icon'>keyboard_arrow_left</span></button>"
                                    :navigationClickTargetSize="0"
                                    :loop="true">

                                <slide v-for="item in r.items" :key="item.id">
                                    <div class="mdc-card slide">
                                        <img class="mdc-card__media-item" :src="item.image.url" v-if="item.image">
                                        <section class="mdc-card__primary">
                                            <h1 class="mdc-card__title mdc-card__title mdc-theme--primary" @click="autosubmit(item.optionInfo.key)">{{item.title}}</h1>
                                        </section>
                                        <section class="mdc-card__supporting-text">
                                            {{item.description}}
                                        </section>
                                    </div>
                                </slide>
                            </carousel>
                        </div>

                        <!-- Bot message types / List -->

                        <div class="mdc-list-group mdc-card" v-if="r.type == 'list_card'">
                            <h3 class="mdc-list-group__subheader">{{r.title}}</h3>
                            <ul class="mdc-list mdc-list--two-line mdc-list--avatar-list" v-for="item in r.items" @click="autosubmit(item.optionInfo.key)">
                                <li class="mdc-list-item">
                                    <img :title="item.image.accessibilityText" :alt="item.image.accessibilityText" class="mdc-list-item__start-detail" width="56" height="56" :src="item.image.url" v-if="item.image"/>
                                    <span class="mdc-list-item__text">
                                        {{item.title}}
                                    <span class="mdc-list-item__text__secondary">{{item.description}}</span>
                                    </span>
                                </li>
                            </ul>
                        </div>

                        <!-- Bot message types / Link Chip -->

                        <div v-if="r.type == 'link_out_chip'" class="chips">
                            <a class="suggestion link" :href="r.url" target="_blank">
                                {{r.destinationName}} <i class="material-icons openlink">open_in_new</i>
                            </a>
                        </div>

                        <!-- Bot message types / Suggestion Chip -->

                        <div v-if="r.type == 'suggestion_chips'" class="chips">
                            <div class="suggestion" @click="autosubmit(s.title)" v-for="s in r.suggestions">
                                {{s.title}}
                            </div>
                        </div>

                    </div>
                </td>
            </tr>
        </table>

        <br>
        <p class="copyright" v-if="answers.length > 0" id="bottom">Proudly powered by <a href="https://mish.io/Ushakov">Ushakov</a> & <a href="https://dialogflow.com">Dialogflow</a></p>

    </main>
    </div>

    
    <section id="latera-informatin">
            <div class="avatar-circle-content"><img src="../img/avatar-circle-ada.png" alt="" id="avatar-cirlce"></div>
            <h1 class="color-text">Hola 👋</h1>
            <p class="color-text">😄Soy Ada, un gusto conocerte estoy realmente feliz de ayudarte a conocer el Curso de yoga para principiantes</p>
    </section>
</section>
</template>

<style lang="sass">
@import url('https://fonts.googleapis.com/css?family=Roboto')

$color: #FF9800

\:root
  --mdc-theme-primary: $color

body
    margin: 0
    background-color: #F5F5F5
    font-family: 'Roboto', sans-serif

#app
    display: flex

#wrapper-1
    width: 70%

#latera-informatin
    width: 30%
    background: white
    border-left: 1px solid #e1e1e1
    height: 92vh
    z-index: 9999
    padding: 34px
    position: fixed
    right: 0

.color-text
    color: rgb(48, 48, 48)

.wrapper
    max-width: 500px
    margin-left: auto
    margin-right: auto

.wrapper.ai-window
    padding: 1rem

.up
    font-size: 32px
    background-color: white
    padding: 10px
    border-radius: 50%

.title
    vertical-align: middle
    text-align: center
    font-weight: 700
    color: rgba(0,0,0,0.7)
    margin-top: 30%

.query
    padding: 5px 0px;
    background-color: white
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)
    z-index: 999
    position: fixed
    width: 70%
    display: flex;
    flex-direction: row
    padding-bottom: 0
    bottom: 0
    margin-bottom: 0

    
.img-avatar
    max-width: 172px;
    margin-left: 1%;
    width: 100%;
    margin-bottom: -4px;
    margin-top: -54px;

#entry-s
    display: flex
    justify-content: space-between
    align-items: center
    max-width: 809px
    width: 60%

#img-avatar-container
    margin:auto

#mic
    margin-left: 0
    margin-right: 25px

.queryform
    border: 1px solid #d4d9dd
    width: 100% - 20%
    margin-left: 60px
    font-size: 16px
    outline: none
    color: rgba(0,0,0,0.8)
    font-weight: 50
    padding: 15px


    @media screen and (max-width: 320px)
        width: 100% - 35%

.iicon
    margin-left: 20px
    position: absolute
    vertical-align: middle
    color: rgba(0,0,0,0.8)
    cursor: pointer

.recording
    color: #F44336

.iicon.t2s
    margin-left: 10px
    margin-right: 20px
    position: relative
    margin-left: 0

    @media screen and (max-width: 720px)
        right: 0

.chat-window
    width: 100%

.bubble
    max-width: 300px
    background-color: #fff
    padding: 16px
    border-radius: 3px
    color: rgba(0,0,0,0.7)
    float: right
    box-shadow: 0 1px 3px rgba(0,0,0,0.12)
    
.gb
    background-color: #a4addf;
    float: left;
    margin-right: 10px
    margin-left: -34px
    border: none
    margin-bottom: 10px;

#your-m:before 
    content: "Tú"
    float: right
    margin-left: -64px
    margin-right: 7px
    font-size: 14px
    color: rgba(0, 0, 0, 0.43)
    

#bot-m
    display: flex
    &:before
        content: "Ada"
        font-size: 14px
        height: 15px
        float: left
        color: rgba(0, 0, 0, 0.43)

.bubble.bot
    background-color: #a4addf
    float: left
    margin-right: 10px
    margin-left: -34px
    border: none

div
    display: inline-block;

td
    margin-top: 30px
    margin-bottom: 10px

.mdc-card
    background-color: white
    max-width: 300px
    margin-bottom: 5px

.slide
    margin: 5px
    max-width: 300px

.slider
    max-width: 300px
    margin-left: -5px

.mdc-fab
    background-color: white
    color: $color
    
.rightnav
    margin-left: -32px

    @media screen and (max-width: 720px) 
            margin-left: -35px

    @media screen and (max-width: 320px) 
            margin-left: -70px

.leftnav
    margin-right: -35px

    @media screen and (max-width: 720px)
        display: none

.openlink
    vertical-align: middle
    margin-top: -5px
    margin-left: 5px

.mdc-card__media-item
    height: auto
    width: 100%
    margin-top: -5px

.chips
    margin-left: -10px

.suggestion
    margin-top: 10px
    float: left
    margin-left: 10px
    padding: 10px
    border: 1px rgb(48, 48, 48) solid
    color: rgb(48, 48, 48)
    border-radius: 100px
    cursor: pointer
    min-width: 61px
    text-align: center

.suggestion:active
    border: 2px rgba(0,0,0,1) solid
    color: rgba(0,0,0,1)

.suggestion.link
    color: white
    background-color: $color
    border: 2px $color solid

.suggestion.link:active
    background-color: darken($color, 10%)
    border: 2px darken($color, 10%) solid

.mdc-list-item__start-detail
    border-radius: 50%

.copyright
    font-weight: 600
    color: rgba(0,0,0,0.8)

.copyright a
    text-decoration: none
    color: rgba(0,0,0,0.8)
    border-bottom: 2px solid transparent

.copyright a:hover
    color: $color
    border-bottom: 2px solid $color

#bottom
    min-height: 280px   


#avatar-cirlce
    width: 100%
    max-width: 88px
    display: block
    margin: 25px auto

.modal-video
    position: fixed;
    font-family: Arial, Helvetica, sans-serif
    top: 0
    right: 0
    bottom: 0
    left: 0
    background: rgba(0,0,0,0.8)
    z-index: 99999
    opacity: 0
    -webkit-transition: opacity 400ms ease-in
    -moz-transition: opacity 400ms ease-in
    transition: opacity 400ms ease-in
    pointer-events: none
    display: flex

.modal-video:target
    pointer-events: auto
    opacity: 1

.iframe
    display: block
    margin: auto

.close
    position: fixed
    right: 44px
    top: 33px
    color: white

.tx
    font-size: 45px
    color: white

.mdc-card__title
    font-size: 1.1rem
    letter-spacing: 0
    font-weight: 700
    line-height: 1.5rem
    color: #303030
    -moz-osx-font-smoothing: grayscale
    -webkit-font-smoothing: antialiased

.mdc-card__subtitle
    letter-spacing: 0;
</style>

<script>
import { ApiAiClient } from 'api-ai-javascript'
const client = new ApiAiClient({accessToken: '335f96fe0c7c473da3810df2e3d6f4c4'}) // <- replace it with yours

export default {
    name: 'app',
    data: function(){
        return {
            answers: [],
            query: 'Iniciar',
            speech: 'Go ahead, im listening...',
            micro: false,
            muted: false,
            online: navigator.onLine,
        }
    },

    methods: {
        submit(){
            client.textRequest(this.query).then((response) => {
                this.answers.push(response)
                this.handle(response) // <- handle the response in handle() method

                this.query = ''
                this.speech = 'Go ahead, im listening...' // <- reset query and speech
                
                var b = document.body.scrollHeight;
                var a = response.result;
                window.scrollTo(0, b) //<- Uncomment this if you want autoscroll
                console.log(a, b);
                
            })
        },

        handle(response){
            if(response.result.fulfillment.speech || response.result.fulfillment.messages[0].type == 'simple_response' && this.muted == false){
                    let speech = new SpeechSynthesisUtterance(response.result.fulfillment.speech || response.result.fulfillment.messages[0].textToSpeech)
                    speech.voiceURI = 'native'
                    speech.lang = 'es-US' // <- Nice british accent
                    window.speechSynthesis.speak(speech) // <- Speech output

                }
        },
        autosubmit(suggestion){
            this.query = suggestion
            this.submit()
        },
        mute(mode){
            this.muted = mode
        },
        microphone(mode){
            this.micro = mode
            let self = this // <- correct scope

            if(mode == true){
                let recognition = new webkitSpeechRecognition() // <- chrome speech recognition

                recognition.interimResults = true
                recognition.lang = 'es-US'
			    recognition.start()

                recognition.onresult = function(event){
			        for (var i = event.resultIndex; i < event.results.length; ++i){
			    	    self.speech = event.results[i][0].transcript
			        }
			    }

			    recognition.onend = function(){
				    recognition.stop()
                    self.micro = false
                    self.autosubmit(self.speech)
			    }
            }
        }
    },

     created: function(){
       this.submit() 
    },
}
</script>
