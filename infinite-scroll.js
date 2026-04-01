export function initInfiniteScroll({
  containerSelector,
  loadCallback,
  offset = 100,
}) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  let loading = false;

  async function checkScroll() {
    if (loading) return;
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - offset
    ) {
      loading = true;
      await loadCallback(container);
      loading = false;
    }
  }

  window.addEventListener("scroll", checkScroll);
  checkScroll();
}
