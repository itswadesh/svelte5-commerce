let menu = $state(0);

export function getMenu() {
  function set(data) {
    menu = data;
  }

  return {
    get menu() {
      return menu;
    },
    set,
  };
}
