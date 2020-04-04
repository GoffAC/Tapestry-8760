import React from 'react';


export default class ResetButton extends React.Component {

    onClickDispatchEvent() {
        window.dispatchEvent(
            new CustomEvent('resetDayClicked')
        );
        console.log('triggered')
    };

    render() {
        return (
            <button type="button" class="resetButton" onClick={this.onClickDispatchEvent}>Reset Day</button>

        )
    }
}