// For each progress bar, we will have a different start and end value

function animateProgress(skillClass, startValue, endValue, speed) {
  let circularProgress = document.querySelector(`.${skillClass}`),
      progressValue = circularProgress.querySelector(".progress-value");

  let progressStartValue = startValue;    

  let progress = setInterval(() => {
      progressStartValue++;
      progressValue.textContent = `${progressStartValue}%`;
      circularProgress.style.background = `conic-gradient(#7d2ae8 ${progressStartValue * 3.6}deg, #ededed 0deg)`;
      if (progressStartValue == endValue) {
          clearInterval(progress);
      }
  }, speed);
}

// Call the function for each skill with different values
animateProgress("html", 0, 70, 70);  
animateProgress("css", 0, 50, 70);  
animateProgress("js", 0, 30, 70);
animateProgress("C", 0, 90, 70);


