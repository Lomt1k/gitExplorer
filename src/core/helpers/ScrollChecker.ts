class ScrollChecker {
  private _lastCheckTime: number = 0;

  constructor(
    private readonly _percentage: number,
    private readonly _callback: Function
  ) {}

  public start() {
    window.addEventListener('scroll', this.checkScrollPosition.bind(this));
    window.addEventListener('resize', this.checkScrollPosition.bind(this));
  }

  public stop() {
    window.removeEventListener('scroll', this.checkScrollPosition.bind(this));
    window.removeEventListener('resize', this.checkScrollPosition.bind(this));
  }

  public checkScrollPosition() {
    // Проверяем не чаще, чем раз в 100 мс
    if (Date.now() - this._lastCheckTime < 100) {
      return;
    }
    this._lastCheckTime = Date.now();

    // Высота документа и экрана
    const height = document.body.offsetHeight;
    const screenHeight = window.innerHeight;

    // Сколько пикселей уже проскроллили
    const scrolled = window.scrollY;

    // Порог
    const threshold = height - screenHeight / (100 / this._percentage);

    // Низ экрана относительно страницы
    const position = scrolled + screenHeight;

    if (position >= threshold) {
      this._callback();
    }
  }
}

export default ScrollChecker;