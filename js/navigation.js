document.addEventListener("DOMContentLoaded", () => {
  let lastScrollTop = 0;
  const pages = ["main.html", "hobby.html", "guestbook.html"];
  let currentPageIndex = pages.findIndex((page) =>
    location.pathname.endsWith(page)
  );

  function navigateToPage(index) {
    if (index >= 0 && index < pages.length) {
      window.location.href = pages[index];
    }
  }

  window.addEventListener(
    "scroll",
    () => {
      let st = window.pageYOffset || document.documentElement.scrollTop;
      if (
        st > lastScrollTop &&
        window.innerHeight + window.scrollY >= document.body.offsetHeight
      ) {
        // Scrolling down
        if (currentPageIndex < pages.length - 1) {
          currentPageIndex++;
          navigateToPage(currentPageIndex);
        }
      } else if (st < lastScrollTop && window.scrollY === 0) {
        // Scrolling up
        if (currentPageIndex > 0) {
          currentPageIndex--;
          navigateToPage(currentPageIndex);
        }
      }
      lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
    },
    false
  );

  window.addEventListener(
    "wheel",
    (e) => {
      if (
        e.deltaY > 0 &&
        window.innerHeight + window.scrollY >= document.body.offsetHeight
      ) {
        // Scrolling down with mouse wheel
        if (currentPageIndex < pages.length - 1) {
          currentPageIndex++;
          navigateToPage(currentPageIndex);
        }
      } else if (e.deltaY < 0 && window.scrollY === 0) {
        // Scrolling up with mouse wheel
        if (currentPageIndex > 0) {
          currentPageIndex--;
          navigateToPage(currentPageIndex);
        }
      }
    },
    false
  );
});
