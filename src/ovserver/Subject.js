
export default class Subject {
    constructor() {
        this.observers = {}
    }

    subscribe(command, observer) {
        if (!observer.id) {
            return
        }

        if (!this.observers[command]) {
            this.observers[command] = []
        }
        let arrObservers = this.observers[command]
        let exits = arrObservers.filter((item) => {
            return item.id === observer.id
        })
        if (exits.length === 0) {
            arrObservers.push(observer)
        }
    }

    unsubscribe(command, observer) {
        if (!this.observers[command]) {
            return
        }

        let arrObservers  = this.observers[command].filter((item) => {
            return item.id !== observer.id
        })
        this.observers[command] =  arrObservers
    }

    update(command, data = {}) {
        if (!this.observers[command]) {
            return
        }

        this.observers[command].map((item) => {
            item.update(command, data)
        })
    }
}