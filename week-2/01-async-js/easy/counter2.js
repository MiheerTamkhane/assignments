function counter(count) {
  for (let i = count; i >= 0; i--) {
    setTimeout(() => {
      console.log(i);
    }, 1000 * i);
  }
}

counter(4);
