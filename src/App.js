import React, {Component} from 'react';
import './App.css';
import Button from "@material-ui/core/Button";
import {TextField} from "@material-ui/core";

class App extends Component {
    constructor() {
        super();
        this.state = {
            hours: 0,
            minutes: 0,
            seconds: 0,
            show: false
        }
        this.hoursInput = React.createRef();
        this.minutesInput = React.createRef();
    }

    inputHandler = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    convertToSeconds = (hours, minutes, seconds) => {
        return seconds + minutes * 60 + hours * 60 * 60;
    }

    startTimer = (e) => {
        const {hours, minutes, seconds} = this.state;
        if (minutes > 60) {
            const minutesTemp = parseInt(minutes / 60);
            this.setState({
                hours: hours + (minutesTemp),
                minutes: minutes % 60,
            })
        }
        this.setState({
            show: true
        })

        this.timer = setInterval(this.countDown, 1000);
    }

    countDown = () => {
        const {hours, minutes, seconds} = this.state;
        let c_seconds = this.convertToSeconds(hours, minutes, seconds);

        if (c_seconds) {

            // seconds change
            seconds ? this.setState({seconds: seconds - 1}) : this.setState({seconds: 59});

            // minutes change
            if (c_seconds % 60 === 0 && minutes) {
                this.setState({minutes: minutes - 1});
            }

            // when only hours entered
            if (!minutes && hours) {
                this.setState({minutes: 59});
            }

            // hours change
            if (c_seconds % 3600 === 0 && hours) {
                this.setState({hours: hours - 1});
            }

        } else {
            clearInterval(this.timer);
        }
    }

    resetTimer = () => {
        this.setState({
            hours: 0,
            minutes: 0,
            seconds: 0,
            show: false
        });
        this.hoursInput.current.value = 0;
        this.minutesInput.current.value = 0;
    }


    render() {
        const {hours, minutes, seconds} = this.state;

        return (
            <div className="App">
                <div className="inputGroup" style={{visibility: (this.state.show ? 'hidden' : 'visible')}}>
                    <h3>Hour</h3>
                    <TextField ref={this.hoursInput} variant="outlined" color="primary"
                               type="number" id="hours"
                               name="hours"
                               onChange={this.inputHandler}/>
                    <h3>Minute</h3>
                    <TextField ref={this.minutesInput} variant="outlined" color="primary"
                               id="minutes" type="number"
                               name="minutes"
                               onChange={this.inputHandler}/>
                    <div>
                        <Button onClick={this.startTimer} className="start" variant="outlined"
                                color="primary">Start</Button>
                    </div>
                </div>
                <div style={{visibility: (this.state.show ? 'visible' : 'hidden')}}>
                    <h1 style={{fontSize:"100px"}}>{hours}: {minutes} : {seconds} </h1>
                    <Button onClick={this.resetTimer} className="return" variant="outlined"
                            color="primary">Return</Button>
                </div>
            </div>

        );
    }
}

export default App;
