export function projectDesign() {
  const projects = document.querySelectorAll('.project');

  projects.forEach(project => {
    const screens = Array.from(project.querySelectorAll('.device__screen'));

    const scrollAll = e => {
      const target = e.target;
      const maxScroll = target.scrollHeight - target.clientHeight;
      if (maxScroll <= 0) return;

      const ratio = target.scrollTop / maxScroll;

      screens.forEach(screen => {
        if (screen !== target) {
          screen.scrollTo(
            0,
            (screen.scrollHeight - screen.clientHeight) * ratio
          );
        }
      });
    };

    screens.forEach(screen => {
      screen.addEventListener('mouseenter', () => {
        screen.addEventListener('scroll', scrollAll);
      });

      screen.addEventListener('mouseleave', () => {
        screen.removeEventListener('scroll', scrollAll);
      });

      screen.addEventListener('touchstart', () => {
        screen.addEventListener('scroll', scrollAll);
      });

      screen.addEventListener('touchend', () => {
        screen.removeEventListener('scroll', scrollAll);
      });
    });
  });
}
