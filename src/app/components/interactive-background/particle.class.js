export class Particle {

    constructor(canvas, coordinates = null, params = null) {
        
        this.maxPx = 30;
        this.canvas = canvas;
        this.coordinates = coordinates;
        
        if(canvas && !params){
            this.ch = Math.max(canvas.height, 800);
            this.cw = Math.max(canvas.width, 1000);

            this.unitToPx = Math.min( Math.min(canvas.width, canvas.height)/20, this.maxPx) ;
            
            this.x = Math.random() * this.cw;
            this.y = Math.random() * this.ch;
        } else {
            this.x = params.x;
            this.y = params.y;
        }

        this.setSize();
        this.setVelocity();
    }
    
    setSize(){
        if(!this.size || this.size === 6) {
            this.size = Math.floor(Math.random()*3)+2;
        }
    }
    setVelocity() {
        this.vx = (Math.floor(Math.random()*10)-5)/10; // X axis velocity
        this.vy = (Math.floor(Math.random()*10)-5)/10; // Y axis velocity
    }

    move(){
        this.gpId = null;
        
        if(!this.vx || ! this.vy ){
            this.setVelocity();
        }
        if(this.size === 6) {
            this.setSize()
        }
        this.x += this.vx;
        this.y += this.vy;

        if(this.canvas) {
            if(this.y > this.ch + 20) {
                this.y = -10;
                this.x = Math.random() * this.cw;
            }
            if(this.y < -20) {
                this.y = this.ch + 10;
                this.x = Math.random() * this.cw;
            }
            if(this.x > this.cw + 20) {
                this.y = Math.random() * this.ch;
                this.x = -10;
            }
            if(this.x < -20) {
                this.y = Math.random() * this.ch;
                this.x = this.cw + 10;
            }
        }
    }

    moveToCoordinates(coordinates) {

        this.gpId = coordinates.gpId;

        this.vx = 0;
        this.vy = 0;

        this.tx = (this.canvas.width/2) + (this.unitToPx*coordinates.x); // Target x coordinate
        this.ty = (this.canvas.height/2) - (this.unitToPx*coordinates.y); // Target y coordinate
        
        // Easing
        this.x += (this.tx-this.x)*10/100;
        this.y += (this.ty-this.y)*10/100;

        if(coordinates.primary) {
            this.isPrimary =true
            
        } else {
            this.setSize();
        }
    }
    
}