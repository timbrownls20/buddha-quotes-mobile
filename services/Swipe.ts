import {
  GestureStateChangeEvent,
  PanGestureHandlerEventPayload,
} from 'react-native-gesture-handler';

export class Swipe {
  private _tolerance: number = 50;

  constructor(
    private gesture: GestureStateChangeEvent<PanGestureHandlerEventPayload>,
  ) {
    console.log(gesture);
  }
  get isRightSwipe() {
    return this.gesture.translationX > this._tolerance;
  }

  get isLeftSwipe() {
    return this.gesture.translationX < 0 - this._tolerance;
  }

  toString() {
    return `right: ${this.isRightSwipe}; left ${this.isLeftSwipe}`;
  }
}
