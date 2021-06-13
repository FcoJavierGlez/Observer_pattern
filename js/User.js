class User {
    constructor( name, messages = undefined ) {
        this._messagesList = messages  == undefined ? [] : messages;
        this._name = name;
        this._update = false;
    }

    getLastMessage = function() {
        return this._messagesList[ this._messagesList.length -1 ];
    }

    getMessages = function() {
        return this._messagesList;
    }

    getName = function() {
        return this._name;
    }

    getUpdate = function() {
        return this._update;
    }

    toggleUpdate = function() {
        this._update = !this._update;
    }

    update = function( message ) {
        if ( message.to == '' || message.to !== '' && (message.from == this._name || message.to == this._name) ) {
            this._messagesList.push( message );
            this.toggleUpdate();
        }
    }
}