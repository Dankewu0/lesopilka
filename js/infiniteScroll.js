(() => {
  const initInfiniteScroll = (selector, trackClassName, gap, speed) => {
    const root = document.querySelector(selector);

    if (!root) return;

    const items = Array.from(root.querySelectorAll("img"));
    if (!items.length) return;

    const track = document.createElement("div");
    track.className = trackClassName;

    items.forEach((item) => track.appendChild(item));
    root.appendChild(track);

    const cloneItem = (node) => node.cloneNode(true);

    const measureSetWidth = () => {
      const firstSet = [...track.children].slice(0, items.length);

      return (
        firstSet.reduce(
          (sum, node) => sum + node.getBoundingClientRect().width,
          0,
        ) +
        (firstSet.length - 1) * gap
      );
    };

    const rebuildTrack = () => {
      track.innerHTML = "";
      items.forEach((item) => track.appendChild(item));

      const baseWidth = measureSetWidth();
      const needWidth = root.clientWidth + baseWidth;

      while (track.scrollWidth < needWidth) {
        items.forEach((item) => {
          track.appendChild(cloneItem(item));
        });
      }
    };

    let offset = 0;
    let loopWidth = 0;
    let frameId = 0;

    const render = () => {
      offset -= speed;

      if (Math.abs(offset) >= loopWidth) {
        offset = 0;
      }

      track.style.transform = `translate3d(${offset}px, 0, 0)`;
      frameId = requestAnimationFrame(render);
    };

    const start = () => {
      cancelAnimationFrame(frameId);
      rebuildTrack();
      loopWidth = measureSetWidth();
      offset = 0;
      track.style.transform = "translate3d(0, 0, 0)";
      render();
    };

    start();
    window.addEventListener("resize", start);
  };

  initInfiniteScroll(".tops", "tops-track", 10, 0.6);
  initInfiniteScroll(".company", "company-track", 60, 0.5);
})();
