import React from "react";

class timer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            hours: 0,
            minutes: 0,
            hide: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.hours == 0 || this.state.minutes == 0) {
            return;
        }
        this.setState(state => ({
            seconds: state.seconds,
            hours: state.hours,
            hide: true
        }));
    }

    render() {
    }

}

export default timer;
