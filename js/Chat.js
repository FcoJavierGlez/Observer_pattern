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
        this._messagesList.push( message );
        this._notify();
    }

    _notify = function() {
        this._observerList.forEach( e => e.update( this._messagesList[ this._messagesList.length - 1 ] ) );
    }
}