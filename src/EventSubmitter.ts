/* 

Дополнительное задание: Написать реализацию EventEmitter

Подписка на события:
Реализовать метод on(eventName, listener), который:
- Регистрирует обработчик события listener на событие с именем eventName
- Позволяет регистрировать несколько обработчиков на одно событие.

Реализовать метод emit(eventName, ...args), который:
- Вызывает все обработчики, зарегистрированные на событие с именем eventName
- Передает в обработчики параметры, указанные в...args

Реализовать метод off(eventName, listener), который:
- Удаляет указанный обработчик listener для события с именем eventName
- Если обработчик не найден, ничего не делает

*/

// ПРИМЕЧАНИЕ ОТ РАЗРАБОТЧИКА: off удаляет сразу все идентичные подписки. То есть если два раза подписаться через on и один раз отписаться через off - отпишется сразу от двух.
// Не баг а фича. При необходимости мог бы сделать чтобы только одну отписку удаляло. Просто код был бы чуть побольше.

class EventEmitter {
  private _listeners: Map<string,Function[]> = new Map();

  public on(eventName: string, listener: Function) {
    const listenersArray = this._listeners.get(eventName);
    listenersArray?.push(listener) ?? this._listeners.set(eventName, [listener]);
  }

  public off(eventName: string, listener: Function) {
    const listenersArray = this._listeners.get(eventName);
    if (!listenersArray) {
      return;
    }
    this._listeners.set(eventName, listenersArray.filter(e => e != listener));
  }

  public emit(eventName: string, ...args: any[]) {
    const listenersArray = this._listeners.get(eventName);
    listenersArray?.forEach(listener => listener(args));
  }
}

export default EventEmitter;