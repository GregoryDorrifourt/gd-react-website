import React, { Component } from 'react';
import linkedinLogo from '../../../assets/images/linkedin.svg';
import maltLogo from '../../../assets/images/malt.svg';
import githubLogo from '../../../assets/images/github.svg';
import mapPinSymbol from '../../../assets/images/map-pin.svg';
import {connect} from 'react-redux';
import './home.component.scss';
import { startAnimation } from '../../actions';

class Home extends Component {
    render () {
        return (
            <div className={`Home ${this.props.animation.inProgress ? 'hide':''}`}>
                <div className="wrapper">
                    <div className="logo" onClick={(e) => this.launchAnimation(e)} title="Voir l'animation">
                        <div className="logo-wrapper">    
                            <div className="heart"></div>
                            <div className="gd"></div>
                        </div>
                    </div>
                    <h1 className="title" title="Gregory Dorrifourt">gregory<strong>dorrifourt</strong></h1>
                    <p className="tag-line">Lead Front-end developer<br/><strong><img src={mapPinSymbol} width="9" alt=""/> Paris</strong></p>
                    <ul className="links-list">
                        <li className="link-item">
                            <a className="link" href="https://github.com/GregoryDorrifourt" title="Voir mon profil GitHub"><img src={githubLogo} alt="Animation" width="16" height="16"/></a>
                        </li>
                        <li className="link-item">
                            <a className="link" href="https://www.linkedin.com/in/gregory-dorrifourt" title="Voir mon profil LinkedIn"><img src={linkedinLogo} alt="LinkedIn" width="16" height="16"/></a>
                        </li>
                        <li className="link-item">
                            <a className="link" href="https://www.malt.fr/profile/gregorydorrifourt" title="Voir mon profil Malt"><img src={maltLogo} alt="Malt" width="16" height="16"/></a>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }

    launchAnimation(e) {
        if(!this.props.animation.inProgress) {
            this.props.startAnimation();
        }
    }
}

const mapDispatchToProps = {
    startAnimation
}

const mapStateToProps = (state, ownProps) => {
    return {
        animation: state.animationReducer
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Home)