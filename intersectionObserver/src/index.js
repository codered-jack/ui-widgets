import "./style.scss";

export const loadApp = () => {
  const allp = document.querySelectorAll(".container p");

  let options = {
    root: null,
    rootMargin: "-150px 50px",
    threshold: 0.15,
  };

  let observer = new IntersectionObserver(touch, options);

  allp.forEach((p) => observer.observe(p));

  function touch(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        console.log("intersecting");
        entry.target.classList.add("active");
        //ob.unobserve(entry.target);
      } else {
        entry.target.classList.remove("active");
      }
    });
  }
};

loadApp();
