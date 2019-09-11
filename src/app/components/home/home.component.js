import React, { Component } from 'react';
import linkedinLogo from '../../../assets/images/linkedin.svg';
import maltLogo from '../../../assets/images/malt.svg';
import githubLogo from '../../../assets/images/github.svg';
import mapPinSymbol from '../../../assets/images/map-pin.svg';
import {connect} from 'react-redux';
import { startAnimation } from '../../actions';
import './home.component.scss';

class Home extends Component {
    render () {
        return (
            <div className={`Home ${this.props.animation.inProgress===true? 'hide':''}`}>
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
                            <a className="link" href="https://github.com/GregoryDorrifourt" target="_blank" title="Voir mon profil GitHub"><img className="link-image" src={githubLogo} alt="Github"/></a>
                        </li>
                        <li className="link-item">
                            <a className="link" href="https://www.linkedin.com/in/gregory-dorrifourt" target="_blank" title="Voir mon profil LinkedIn"><img className="link-image" src={linkedinLogo} alt="LinkedIn"/></a>
                        </li>
                        <li className="link-item">
                            <a className="link" href="https://www.malt.fr/profile/gregorydorrifourt" target="_blank" title="Voir mon profil Malt"><img className="link-image" src={maltLogo} alt="Malt"/></a>
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