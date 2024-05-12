export const load = async ({ fetch }) => {
  const initRes = await fetch(
    "http://api.litekart.in/api/init?domain=demo.litekart.in",
  );
  const init = await initRes.json();
  console.log("layout.server.ts", init);
  return {
    menu: init.menu,
    megamenu: init.megamenu,
    store: init.storeOne,
    popularSearches: init.popularSearches,
  };
};
