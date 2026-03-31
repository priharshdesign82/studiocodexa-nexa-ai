document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll("#docSidebar .nav-link");
  const offcanvasElement = document.getElementById("sidebarOffcanvas");
  const sections = document.querySelectorAll(".doc-section");

  // Click Event
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 30;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });

        if (window.innerWidth < 992) {
          const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement) || new bootstrap.Offcanvas(offcanvasElement);
          bsOffcanvas.hide();
        }
      }
    });
  });

  // Custom ScrollSpy
  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (window.scrollY >= sectionTop - 100) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
});