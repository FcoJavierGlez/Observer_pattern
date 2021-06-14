/**
 * @author Francisco Javier González Sabariego
 */
class Chat {
    constructor( observers = undefined, messages = undefined ) {
        this._observerList = observers == undefined ? [] : observers;
        this._messagesList = messages  == undefined ? [] : messages;
    }

    attach = function( observer ) {
        this._observerList.push( observer );
    }

    detach = function( observer ) {
        const newObserverList = JSON.parse( JSON.stringify( this._observerList ) );
        this._observerList = newObserverList.filter( e => e !== observer );
    }

    setMessage = function(message) {
        let date = new Date();
        message.time = `${this._formatDate( date.getHours() )}:${this._formatDate( date.getMinutes() )}:${this._formatDate( date.getSeconds() )}`;
        this._messagesList.push( message );
        this._notify();
    }

    _notify = function() {
        this._observerList.forEach( e => e.update( this._messagesList[ this._messagesList.length - 1 ] ) );
    }

    _formatDate = date => date < 10 ? `0${date}` : date;
}