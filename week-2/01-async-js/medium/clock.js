function formatAMPM(timestamp) {
  const date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  const ampm = hours >= 12 ? "PM" : "AM";

  // Convert hours to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // If hours is 0, set it to 12

  // Add leading zeroes to minutes and seconds if needed
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  // Construct the formatted time string
  const formattedTime = hours + ":" + minutes + ":" + seconds + " " + ampm;
  return formattedTime;
}

function clock() {
  setInterval(() => {
    const time = Date.now();
    console.log(formatAMPM(time));
  }, 1000);
}

// clock();
