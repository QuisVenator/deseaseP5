class Person {
    constructor(enfermo, x, y) {
      this.enfermo = enfermo;
      this.cured = false;
      this.dead = false;
      this.enfCount = enfermo ? this.getCureTime() : -1;
      this.pos = createVector(random(0, x),random(0, y));
      this.x = x;
      this.y = y;
      this.responsable = random(0, 100) < this.getProbabilidadResponsable() ? true : false;
      this.velocity = p5.Vector.random2D();
    }
    
    draw() {
      if(this.enfermo) stroke('red');
      else if(this.cured) stroke('green');
      else if(this.dead) stroke('black');
      else stroke('blue');
      point(this.pos);
    }
    
    move() {
      if (this.enfermo) this.enfCount--;
      if(this.enfermo && this.enfCount == 0) {
        this.dead = this.tryKill();
        if(!this.dead) this.cured = true;
        this.enfermo = false;
      }
      this.pos.add(this.velocity.copy().setMag(this.getSpeed()));
      if(this.pos.x > this.x) this.pos.x -= this.x;
      if(this.pos.x < 0) this.pos.x += this.x;
      if(this.pos.y > this.y) this.pos.y -= this.y;
      if(this.pos.y < 0) this.pos.y += this.y;
    }
    
    contagiar(p2) {
      if(this.cured || this.enfermo || this.dead) return;
      if(this.pos.dist(p2.pos) < this.getDistCont()) {
        this.enfermo = this.tryInfect(p2);
        if(this.enfermo) {
            this.enfCount = this.getCureTime();
            this.contagioAnim();
        }
      }
    }

    getDistCont() {
        return contactDistSlider.value();
    }
    getCureTime() {
        return cureTimeSlider.value();
    }
    tryInfect(p2) {
        if(!p2.enfermo) return false;
        let chance = 100 * this.getInfectiousness();
        chance *= p2.responsable ? this.getMaskEffectivness() : 1;
        chance *= this.responsable ? this.getMaskEffectivness() : 1;
        return random(0,100) < chance;
    }
    getSpeed() {
        if(this.responsable) {
            if(this.enfermo) return this.getSickResponsableSpeed();
            else return this.getResponsableSpeed();
        }
        else {
            if(this.enfermo) return this.getSickSpeed();
            else return this.getNormalSpeed();
        }
    }
    getInfectiousness() {
        return infectiousSlider.value();
    }
    getMaskEffectivness(){
        return 1-maskSlider.value();
    }
    getNormalSpeed() {
        return velocitySliderSane.value();
    }
    getResponsableSpeed() {
        return velocitySliderSaneResp.value();
    }
    getSickResponsableSpeed() {
        return velocitySliderSickResp.value();
    }
    getSickSpeed() {
        return velocitySliderSick.value();
    }
    tryKill() {
        return random(0, 100) < 100*this.getDeadliness();
    }
    getDeadliness() {
        return deadlySlider.value();
    }
    getProbabilidadResponsable() {
        return responsableSlider.value();
    }

    contagioAnim() {
      if(this.enfCount < this.getCureTime() - 30) return;
      stroke('red');
      circle(this.pos.x, this.pos.y, (this.enfCount - this.getCureTime() + 30) /3);
    }
  }