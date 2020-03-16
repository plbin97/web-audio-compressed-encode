class Timer {
    constructor() {
        this.startTime = null;
    }

    start() {
        this.startTime = Date.now();
    }

    stop() {
        return Date.now() - this.startTime;
    }

}

export default Timer;