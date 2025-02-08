import React, { Component } from 'react';
import linkedinLogo from '../../../assets/images/linkedin.svg';
import maltLogo from '../../../assets/images/malt.svg';
import githubLogo from '../../../assets/images/github.svg';
import mapPinSymbol from '../../../assets/images/map-pin.svg';
import {connect} from 'react-redux';
import { startAnimation } from '../../actions';
import './home.component.scss';

class Home extends Component {

    links = [
        {
            title: 'GitHub',
            url: 'https://github.com/GregoryDorrifourt?tab=repositories',
            logo: githubLogo
        },
        {
            title: 'LinkedIn',
            url: 'https://www.linkedin.com/in/gregory-dorrifourt',
            logo: linkedinLogo,
            fakeNotification: true
        },
        {
            title: 'Malt',
            url: 'https://www.malt.fr/profile/gregorydorrifourt',
            logo: maltLogo
        }
    ];

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
                    <p className="tag-line">Senior lead developer | Free-lance<br/><strong><img src={mapPinSymbol} width="9" alt=""/> Paris et périphérie ouest</strong></p>
                    <ul className="links-list">
                        {
                            this.links.map((link, index) => {
                                return (
                                    <li key={index} className={`link-item ${!link.logo ? 'text':''}`} data-title={link.title}>
                                        <a className={`link ${link.fakeNotification? 'fake-notification' : ''}`} href={link.url} target="_blank"
                                           rel="noopener noreferrer">
                                            {link.logo
                                                ? <img
                                                    className="link-image"
                                                    src={link.logo}
                                                    alt={link.title}
                                                />
                                                : link.title.toUpperCase()
                                            }
                                        </a>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        )
    }

    launchAnimation(e) {
        if (!this.props.animation.inProgress) {
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