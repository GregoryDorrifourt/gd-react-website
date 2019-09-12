import React, { Component } from 'react';
import { Particle } from './particle.class';
import { connect } from 'react-redux';
import './interactive-background.component.scss';

class InteractiveBackgroundComponent extends Component {

    render () {
        return (
            <canvas id="interactiveBackground"></canvas>
        )
    }

    componentDidMount(){

        const requestAnimationFrame = window.requestAnimationFrame;

        const canvas = document.getElementById('interactiveBackground');

        const isMobile = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i);
        
        let mouseData = null;
        
        let ww = window.innerWidth;
        let wh = window.innerHeight;
        const ctx = canvas.getContext('2d');

        const threshold = 150;
        ctx.canvas.width = ww;
        ctx.canvas.height = wh;
        
        let numParticles = 90;
        
        if (window.matchMedia("(min-width: 481px)").matches) {
            numParticles = 100;
        }
        if (window.matchMedia("(min-width: 1025px)").matches) {
            numParticles = 150;
        }

        const particles = [];
        for(let i=0; i<numParticles; i++) {
            particles.push(new Particle(canvas));
        }
        
        /* Event listeners */
        if (!isMobile) {

            // Track mouse move
            document.addEventListener('mousemove', (e) => {
                mouseData = {
                    x: e.clientX,
                    y: e.clientY
                }
            });

            // Remove mouse data on leave
            document.addEventListener('mouseleave', () => { mouseData = null }); 
        
        }
        
        // Resize canvas
        window.addEventListener('resize', () => {
            ww = window.innerWidth;
            wh = window.innerHeight;
            ctx.canvas.width = ww;
            ctx.canvas.height = wh;
        });
        
        const draw = () => {

            if(!document.hidden) { // CHeck if tab is active

                let shape = [];
                let color = {r: 255, g: 255, b: 255};
                if(this.props.animation.step){
                    shape = this.props.animation.step.coordinates;
                    if(this.props.animation.step.color){
                        color = this.props.animation.step.color;
                    }
                    
                }
    
                ctx.clearRect(0,0,ww,wh);
    
                for (let i = 0; i < particles.length; i++) {
                    
                    const p = particles[i];
                    
                    const connectNearbyDots = (target, xd, yd) => {
                        const needStroke = (p.vx === 0 && target.vx===0 && p.gpId===target.gpId); // Particles don't move and in same group
                        const basicAlpha = 0.8-(Math.max(xd,yd)/threshold);
                        const alpha = (typeof color.a !== 'undefined') ? color.a : (shape.length ? (needStroke ? basicAlpha : 0.05) : basicAlpha);
                        
                        if(shape.length){
                            if(needStroke) {
                                drawLine(p, target, color, alpha);
                            }
                        } else {
                            drawLine(p, target, color, alpha);
                        }
                        
                    }
                    
                    /* Check nearby particles */
                    particles.forEach((nearbyParticle)=>{
                        
                        const xd = Math.abs(nearbyParticle.x - p.x);
                        if (xd < threshold) {
                            
                            const yd = Math.abs(nearbyParticle.y - p.y);
                            if (yd < threshold) {
                                connectNearbyDots(nearbyParticle, xd, yd)
                            }
                        }
                    });
    
                    let radius = p.size;
                    
                    /* Check mouse position if not on mobile device */
                    if(!isMobile && mouseData){
                        
                        const mxd = Math.abs(mouseData.x - p.x);
                        if(mxd<threshold){
                            
                            const myd = Math.abs(mouseData.y - p.y);
                            if (myd<threshold) {
                                connectNearbyDots(mouseData, mxd, myd)
                                radius += (threshold - Math.max(mxd,myd))/5;
                            }
                        }
                    }
                    
                    const basicAlpha = p.size/20;
                    ctx.fillStyle = `rgba(255,255,255,${basicAlpha})`;
                    
                    /* Draw particle */
                    if(shape.length && !this.props.animation.shuttingDown) {
                        const fillStyle = p.vx === 0 ? `rgba(${color.r},${color.g},${color.b},${color.a || basicAlpha})` : ctx.fillStyle;
                        ctx.fillStyle = fillStyle;
                        
                        drawParticle(p, radius);
                        if(shape[i]) {
                            p.moveToCoordinates(shape[i])
                        } else {
                            p.move()
                        }
                    } else {
                        drawParticle(p, radius);
                        p.move()
                    }
                    
                }
            }
            
            requestAnimationFrame(draw);
            
        }

        const drawParticle = (p, radius) => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, radius, Math.PI * 2, false);
            ctx.fill();
        }

        const drawLine = (p, target, color, alpha) => {
            ctx.beginPath();
            ctx.lineWidth = 0.2;
            ctx.strokeStyle = `rgba(${color.r},${color.g},${color.b},${alpha})`;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(target.x, target.y);
            ctx.stroke();
        }

        draw();
    
    }

    getRandom(value){
        return Math.round(Math.random()*value);
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        animation: state.animationReducer
    }
}

export default connect(mapStateToProps)(InteractiveBackgroundComponent)