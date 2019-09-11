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
        
        let numParticles = 70;
        
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

                let shape = []
                if(this.props.animation.step){
                    shape = this.props.animation.step
                }
    
                ctx.clearRect(0,0,ww,wh);
    
                for (let i = 0; i < particles.length; i++) {
                    
                    const p = particles[i];
                    
                    const connectNearbyDots = (target, xd, yd) => {
                        const check = (p.vx === 0 && target.vx===0 && p.gpId===target.gpId); // Particles don't move and in same group
                        const basicAlpha = 0.8-(Math.max(xd,yd)/threshold);
                        const alpha = shape.length ? (check ? basicAlpha : 0.05) : basicAlpha;
                        
                        if(shape.length){
                            if(check) {
                                drawLine(p, target, alpha);
                            }
                        } else {
                            drawLine(p, target, alpha);
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
                    
                    /* Draw particle */
                    if(shape.length && !this.props.animation.shuttingDown) {
                        ctx.fillStyle = `rgba(255,255,255,${p.size/20})`;
                        drawParticle(p, radius);
                        if(shape[i]) {
                            p.moveToCoordinates(shape[i])
                        } else {
                            p.move()
                        }
                    } else {
                        ctx.fillStyle = `rgba(255,255,255,${p.size/20})`;
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

        const drawLine = (p, target, alpha) => {
            ctx.beginPath();
            ctx.lineWidth = 0.2;
            ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
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