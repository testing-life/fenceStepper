class FenceStepper {
    exercises = [];
    maxS;
    maxS;
    #movementDict = new Map(
      Object.entries({ 1: "F", 2: "B", 3: "C" })
    );
    setupContainer = document.getElementById('setup');
    meterContainer = document.getElementById('progress');
  
    constructor(durationS, minLengthS, maxLengthS) {
      this.durationS = durationS;
      this.minLengthS = minLengthS;
      this.maxLengthS = maxLengthS;
    }
  
    getDirection = () => {
      return Math.floor(Math.random() * 3) + 1;
    };
  
    createMotion = ({ minLengthS, maxLengthS, direction } = {}) => ({
      durationS:
        direction === 3 ? 2 : this.getRandomDuration(minLengthS, maxLengthS),
      direction,
    });
  
    getRandomDuration = (minRaw, maxRaw) => {
      let min = Math.ceil(minRaw);
      let max = Math.floor(maxRaw);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };
  
    sumDurations = (arr) =>
      arr.reduce((acc, curr) => acc + curr?.durationS || 0, 0);
  
    getExercises = (callback) => {
      console.log('this', this)
      let exercises = [];
      do {
        const direction = this.getDirection();
        exercises.push(this.createMotion({minLengthS:this.minLengthS, maxLengthS: this.maxLengthS, direction}));
        console.log(exercises);
      } while (this.sumDurations(exercises) < this.durationS);
      this.exercises = exercises;
      callback(exercises);
    };
  
    startLoop = (exercises) => {
      let currentIndex = 0;
  
      const displayNextDirection = () => {
        if (currentIndex >= exercises.length) {    
          this.setupContainer.classList.remove('isHidden');      
          return;
        }        
        
        const item = exercises[currentIndex];
        console.log('meterContainer', this.meterContainer)
        
        const { durationS, direction } = item;
        this.meterContainer.style.setProperty('--duration', `${durationS}s`);
        this.meterContainer.classList.add('withAnimation');
        const contentElement = document.getElementById("directions");  
        contentElement.classList.add("direction");
        contentElement.textContent = `${this.#movementDict.get(
          direction.toString()
        )}`;
  
  
        // Hide it after the specified duration (durationS seconds)
        setTimeout(() => {          
          contentElement.textContent = "";          
          this.meterContainer.classList.remove('withAnimation');
          currentIndex++;
          displayNextDirection();          
        }, durationS * 1000);
      };
  
      displayNextDirection();
    };
  
    init = () => {      
      this.getExercises(this.startLoop);
    };
  }
