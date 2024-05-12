let collections = $state(0);

export function getCollections() {
  function set(data) {
    collections = data;
  }

  return {
    get collections() {
      return collections;
    },
    set,
  };
}
