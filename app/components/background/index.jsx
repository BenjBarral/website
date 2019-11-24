import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { media }  from 'styles';

const Background = styled.div`
    position: fixed;
    height: 100%;
    width: 100%;
    z-index: -9990;
    box-shadow: inset 0px 0px 0px 6px #bf80ff00;
    background: linear-gradient(45deg, #e6ccff00, #bf80ffc9);
    ${'' /* background: linear-gradient(225deg, #22c1c3, #fdbb2d); */}
    ${'' /* ${media.phone`
        background: linear-gradient(0deg, #fff, rgba(255, 212, 0, 0.37));
    `} */}
    &:before {
        box-shadow: inset 0px 0px 0px 6px #f8ffae;
        display: block;
        background: linear-gradient(225deg, #43c6ac, #f8ffae);
        ${'' /* background: linear-gradient(45deg, #22c1c3, #fdbb2d); */}
        ${'' /* ${media.phone`
            background: linear-gradient(0deg, #fff, rgba(0, 243, 255, 0.37));
        `} */}
        height: 100%;
        width: 100%;
        position: fixed;
        z-index: -9999;
        content: '';
        opacity: ${p => p.atBottom ? 1 : 0};
        transition: opacity 2s;
    };
`;

function mapStateToProps(state) {
    return {
        nearTopOfPage: state.scroll.nearTopOfPage,
        nearBottomOfPage: state.scroll.nearBottomOfPage,
    };
};

class BackgroundComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            atBottom: false
        };
    }
    componentWillUpdate(nextProps, nextState) {
        if (nextProps.nearBottomOfPage & !nextState.atBottom) {
            this.setState({atBottom: true});
        } else if (nextProps.nearTopOfPage & nextState.atBottom) {
            this.setState({atBottom: false});
        }
    }
    render() {
        const {atBottom} = this.state;
        return (
            <Background atBottom={atBottom}/>
        );
    }
};

export default connect(mapStateToProps)(BackgroundComponent);
