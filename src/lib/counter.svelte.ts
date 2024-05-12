let count = $state(0);

export function getCounter() {
  function increment(c) {
    count = c + 1;
  }

  return {
    get count() {
      return count;
    },
    increment,
  };
}
