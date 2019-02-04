import AnimationFrame from 'animation-frame';

// main function
export default function scrollTo(
  element,
  scrollTargetY = 0,
  speed = 2000,
  easing = 'easeOutSine'
) {
  // scrollTargetY: the target scrollY property of the window
  // speed: time in pixels per second
  // easing: easing equation to use

  const scrollY = element.scrollTop;
  if (scrollY === 0) {
    return;
  }

  let currentTime = 0;

  const animationFrame = new AnimationFrame();

  // min time .1, max time 1.2 seconds
  const time = Math.max(
    0.1,
    Math.min(Math.abs(scrollY - scrollTargetY) / speed, 1.2)
  );

  // easing equations from https://github.com/danro/easing-js/blob/master/easing.js
  const easingEquations = {
    easeOutSine(pos) {
      return Math.sin(pos * (Math.PI / 2));
    },
    easeInOutSine(pos) {
      return -0.5 * (Math.cos(Math.PI * pos) - 1);
    },
    easeInOutQuint(pos) {
      if ((pos /= 0.5) < 1) {
        return 0.5 * Math.pow(pos, 5);
      }
      return 0.5 * (Math.pow(pos - 2, 5) + 2);
    }
  };

  // add animation loop
  function tick() {
    currentTime += 1 / 60;

    const p = currentTime / time;
    const t = easingEquations[easing](p);

    if (p < 1) {
      animationFrame.request(tick);
      element.scrollTop = scrollY + (scrollTargetY - scrollY) * t;
    } else {
      element.scrollTop = scrollTargetY;
    }
  }

  // call it once to get started
  tick();
}
