const showTabBar = () => {
  const tabBar = document.getElementById("app-tab-bar");
  const header = document.getElementById("header-icon");
  if (tabBar !== null) {
    tabBar.style.display = "flex";
    header.style.display = "block";
  }
};

const hideTabBar = () => {
  const tabBar = document.getElementById("app-tab-bar");
  const header = document.getElementById("header-icon");
  if (tabBar !== null) {
    tabBar.style.display = "none";
    header.style.display = "none";
  }
};

export { showTabBar, hideTabBar };
