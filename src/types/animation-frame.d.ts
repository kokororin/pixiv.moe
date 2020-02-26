declare module 'animation-frame' {
  class AnimationFrame {
    request(callback: () => void): void;
  }
  export = AnimationFrame;
}
