{
    const capitalize = string => string.replace(/^\w/, e => e.toUpperCase() );

    const createMessageChat = user => {
        let message  = user.getLastMessage();
        let nameUser = user.getName();
        const PARAGRAPH = document.createElement("p");
        const SPAN = document.createElement("span");
        const TEXT = document.createTextNode( ` ${message.message}` );

        SPAN.innerHTML = `${message.time} ${message.to == '' ? capitalize(message.from)+":" : message.to == nameUser ? "From @"+capitalize(message.from)+":" : "To @"+capitalize(message.to)+":"}`;
        SPAN.classList = 'user-name';

        PARAGRAPH.appendChild( SPAN );
        PARAGRAPH.appendChild( TEXT );
        message.to !== '' ? PARAGRAPH.classList = 'careless-whisper' : false;

        return PARAGRAPH;
    }

    document.addEventListener("DOMContentLoaded", () => {
        const CHATBOXES = [...document.getElementsByTagName("div")].filter( e => e.id.match(/chat-\d+/) );
        const TEXTAREAS = [...document.getElementsByTagName("textarea")];
        const USER_NAMES = ['User1', 'User2', 'User3', 'User4'];
        let chat;
        let usersList = [];

        CHATBOXES.forEach( (e,i) => {
            usersList.push( new User( USER_NAMES[i].toLowerCase() ) );
        });

        chat = new Chat( usersList );

        const renderChats = function() {
            CHATBOXES.forEach( (e,i) => {
                const CHAT = e.querySelector('.chat');
                if ( usersList[i].getUpdate() ) {
                    CHAT.appendChild( createMessageChat( usersList[i] ) );
                    usersList[i].toggleUpdate();
                }
            });
        }

        //Al pulsar intro se envía el mensaje y se renderiza en todos los observadores
        TEXTAREAS.forEach( e => {
            e.addEventListener("keydown", function(ev) {
                if (ev.code == 'Enter') {
                    ev.preventDefault();
                    if (this.value == '') return;
                    let numberChat = TEXTAREAS.indexOf(this);
                    let destine;
                    chat.setMessage( 
                        {
                            from: usersList[numberChat].getName(),
                            to: (destine = this.value.match(/\@(\w+)\s/)?.[1]) == undefined ? '' : destine,
                            message: destine == undefined ? this.value : this.value.match(/\@\w+\s(.+)/)?.[1],
                        } 
                    );
                    this.value = "";
                    renderChats();
                }
            });
        });
    });
}