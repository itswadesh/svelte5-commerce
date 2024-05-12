export const load = async ({ fetch }) => {
  const initRes = await fetch(
    "http://api.litekart.in/api/init?domain=demo.litekart.in",
  );
  const init = await initRes.json();
  console.log("layout.server.ts");

  const homeRes = await fetch(
    "http://api.litekart.in/api/home?store=6356502aca4ff28ed596cb1b",
  );
  const home = await homeRes.json();

  const collectionsRes = await fetch(
    "http://api.litekart.in/api/collections?store=6356502aca4ff28ed596cb1b",
  );

  const collections = await collectionsRes.json();
  home.collections = collections.data;

  return {
    menu: init.menu,
    megamenu: init.megamenu,
    store: init.storeOne,
    popularSearches: init.popularSearches,
    home,
    collections: collections.data,
  };
};
