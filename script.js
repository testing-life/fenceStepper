class FenceStepper {
    durationS;
    exercises = [];
    maxS;
    maxS;
    #movementDict = new Map(
      Object.entries({ 1: "F", 2: "B", 3: "C" })
    );
  
    constructor(duration, minS, maxS) {
      this.durationS = duration ?? 90;
      this.minS = minS || 2;
      this.maxS = maxS || 3;
    }
  
    getDirection = () => {
      return Math.floor(Math.random() * 3) + 1;
    };
  
    createMotion = ({ minLengthS = 3, maxLengthS = 5, direction = 1 } = {}) => ({
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
      let exercises = [];
      do {
        const direction = this.getDirection();
        exercises.push(
          exercises.length
            ? this.createMotion({ direction })
            : this.createMotion()
        );
        console.log(exercises);
      } while (this.sumDurations(exercises) < this.durationS);
      this.exercises = exercises;
      callback(exercises);
    };
  
    startLoop = (exercises) => {
      let currentIndex = 0;
  
      const displayNextDirection = () => {
        if (currentIndex >= exercises.length) {
          return;
        }
        const item = exercises[currentIndex];
        const { durationS, direction } = item;
  
        const contentElement = document.getElementById("directions");
  
        contentElement.classList.add("direction");
        contentElement.textContent = `${this.#movementDict.get(
          direction.toString()
        )}`;
  
        // Show the direction
        //   directionElement.style.display = 'block';
  
        // Hide it after the specified duration (durationS seconds)
        setTimeout(() => {
          // directionElement.style.display = 'none';
          contentElement.textContent = "X";
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
