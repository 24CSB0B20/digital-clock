// Clock and Date
function updateClock() {
    const clockElement = document.getElementById('clock');
    const dateElement = document.getElementById('date');
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';
  
    hours = hours % 12;
    hours = hours ? hours : 12; // 12-hour format
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
  
    clockElement.innerHTML = `${hours}:${minutes}:${seconds} ${ampm}`;
    dateElement.innerHTML = now.toLocaleDateString();
  
    // Check Alarm
    checkAlarms(hours, minutes, ampm);
  }
  
  setInterval(updateClock, 1000);
  
  // Alarm Functionality
  let alarms = [];
  let alarmStatus = false;
  
  document.getElementById('setAlarmBtn').onclick = () => {
    const alarmTime = document.getElementById('alarmTime').value;
    const [time, ampm] = alarmTime.split(' ');
    const [hour, minute] = time.split(':');
    
    alarms.push({ hour, minute, ampm });
    document.getElementById('alarmStatus').innerHTML = 'Alarm set!';
  };
  
  document.getElementById('toggleAlarmBtn').onclick = () => {
    alarmStatus = !alarmStatus;
    document.getElementById('alarmStatus').innerHTML = alarmStatus ? 'Alarm enabled' : 'Alarm disabled';
  };
  
  function checkAlarms(hour, minute, ampm) {
    alarms.forEach(alarm => {
      if (alarm.hour == hour && alarm.minute == minute && alarm.ampm === ampm && alarmStatus) {
        alert('ALARM! Time to wake up!');
        const audio = new Audio('alarm.mp3');
        audio.play();
        alarmStatus = false; // Disable alarm after it rings
        document.getElementById('alarmStatus').innerHTML = 'Alarm disabled';
      }
    });
  }
  
  // Stopwatch Functionality
  let stopwatchInterval;
  let stopwatchTime = 0;
  
  document.getElementById('startStopwatch').onclick = () => {
    stopwatchInterval = setInterval(() => {
      stopwatchTime++;
      displayStopwatch();
    }, 1000);
  };
  
  document.getElementById('pauseStopwatch').onclick = () => {
    clearInterval(stopwatchInterval);
  };
  
  document.getElementById('resetStopwatch').onclick = () => {
    clearInterval(stopwatchInterval);
    stopwatchTime = 0;
    displayStopwatch();
  };
  
  function displayStopwatch() {
    let hours = Math.floor(stopwatchTime / 3600);
    let minutes = Math.floor((stopwatchTime % 3600) / 60);
    let seconds = stopwatchTime % 60;
    document.getElementById('stopwatchDisplay').innerHTML = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  }
  
  function pad(num) {
    return num < 10 ? '0' + num : num;
  }
  
  // Countdown Timer Functionality
  document.getElementById('startCountdown').onclick = () => {
    let minutes = document.getElementById('minutes').value;
    let seconds = document.getElementById('seconds').value;
    let totalTime = parseInt(minutes) * 60 + parseInt(seconds);
    
    const countdownInterval = setInterval(() => {
      if (totalTime <= 0) {
        clearInterval(countdownInterval);
        alert('Countdown finished!');
        document.getElementById('countdownDisplay').innerHTML = '00:00';
      } else {
        totalTime--;
        const remainingMinutes = Math.floor(totalTime / 60);
        const remainingSeconds = totalTime % 60;
        document.getElementById('countdownDisplay').innerHTML = `${pad(remainingMinutes)}:${pad(remainingSeconds)}`;
        document.getElementById('countdownProgress').style.width = `${(totalTime / (parseInt(minutes) * 60 + parseInt(seconds))) * 100}%`;
      }
    }, 1000);
  };
  
  // Theme Switcher
  document.getElementById('lightTheme').onclick = () => {
    document.body.className = 'light';
  };
  
  document.getElementById('darkTheme').onclick = () => {
    document.body.className = 'dark';
  };
  
  document.getElementById('neonTheme').onclick = () => {
    document.body.className = 'neon';
  };
  
  document.getElementById('customTheme').onclick = () => {
    document.body.className = 'custom';
  };
  