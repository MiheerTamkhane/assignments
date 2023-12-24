function counter(count) {
  let myInterval = setInterval(() => {
    console.log(count);
    count--;
    if (count < 0) clearInterval(myInterval);
  }, 1000);
}
counter(4);
