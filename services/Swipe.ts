import {
  GestureStateChangeEvent,
  PanGestureHandlerEventPayload,
} from 'react-native-gesture-handler';

export class Swipe {
  private _tolerance: number = 50;

  constructor(
    private gesture: GestureStateChangeEvent<PanGestureHandlerEventPayload>,
  ) {}

  get isRight() {
    return (
      this.gesture.translationX > this._tolerance &&
      Math.abs(this.gesture.translationY) < this._tolerance
    );
  }

  get isLeft() {
    return (
      this.gesture.translationX < 0 - this._tolerance &&
      Math.abs(this.gesture.translationY) < this._tolerance
    );
  }

  get isUp() {
    return (
      this.gesture.translationY < 0 - this._tolerance &&
      Math.abs(this.gesture.translationX) < this._tolerance
    );
  }

  get isDown() {
    return (
      this.gesture.translationY > this._tolerance &&
      Math.abs(this.gesture.translationX) < this._tolerance
    );
  }

  toString() {
    return `right: ${this.isRight}; left ${this.isLeft}; up ${this.isUp}; down ${this.isDown}`;
  }
}
