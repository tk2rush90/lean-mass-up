export type AvailableKey =
  'ContextMenu'
  | 'Backspace'
  | 'Enter'
  | 'Space'
  | 'Tab'
  | 'Delete'
  | 'End'
  | 'Help'
  | 'Home'
  | 'Insert'
  | 'PageDown'
  | 'PageUp'
  | 'ArrowDown'
  | 'ArrowLeft'
  | 'ArrowRight'
  | 'ArrowUp'
  | 'Escape'
  | 'PrintScreen'
  | 'ScrollLock'
  | 'Pause'
  | 'AltLeft'
  | 'AltRight'
  | 'CapsLock'
  | 'ControlLeft'
  | 'ControlRight'
  | 'OSLeft'
  | 'OSRight'
  | 'ShiftLeft'
  | 'ShiftRight'
  | 'F1'
  | 'F2'
  | 'F3'
  | 'F4'
  | 'F5'
  | 'F6'
  | 'F7'
  | 'F8'
  | 'F9'
  | 'F10'
  | 'F11'
  | 'F12'
  | 'F13'
  | 'F14'
  | 'F15'
  | 'F16'
  | 'F17'
  | 'F18'
  | 'F19'
  | 'F20'
  | 'F21'
  | 'F22'
  | 'F23'
  | 'F24'
  | 'Digit1'
  | 'Digit2'
  | 'Digit3'
  | 'Digit4'
  | 'Digit5'
  | 'Digit6'
  | 'Digit7'
  | 'Digit8'
  | 'Digit9'
  | 'Digit0'
  | 'KeyA'
  | 'KeyB'
  | 'KeyC'
  | 'KeyD'
  | 'KeyE'
  | 'KeyF'
  | 'KeyG'
  | 'KeyH'
  | 'KeyI'
  | 'KeyJ'
  | 'KeyK'
  | 'KeyL'
  | 'KeyM'
  | 'KeyN'
  | 'KeyO'
  | 'KeyP'
  | 'KeyQ'
  | 'KeyR'
  | 'KeyS'
  | 'KeyT'
  | 'KeyU'
  | 'KeyV'
  | 'KeyW'
  | 'KeyX'
  | 'KeyY'
  | 'KeyZ';

export const KEY_MAP = {
  ContextMenu: [0, 93],
  Backspace: [8],
  Enter: [13],
  Space: [32],
  Tab: [9],
  Delete: [46, 8], // maybe Mac OS use 8 for Delete
  End: [35],
  Help: [6, 45, 47],
  Home: [36],
  Insert: [45],
  PageDown: [34],
  PageUp: [33],
  ArrowDown: [40],
  ArrowLeft: [37],
  ArrowRight: [39],
  ArrowUp: [38],
  Escape: [27],
  PrintScreen: [124, 42, 44],
  ScrollLock: [125, 145],
  Pause: [126, 19, 1],
  AltLeft: [18],
  AltRight: [18],
  CapsLock: [20],
  ControlLeft: [17],
  ControlRight: [17],
  OSLeft: [224, 91],
  OSRight: [92, 93, 91, 224],
  ShiftLeft: [16],
  ShiftRight: [16],
  F1: [112],
  F2: [113],
  F3: [114],
  F4: [115],
  F5: [116],
  F6: [117],
  F7: [118],
  F8: [119],
  F9: [120],
  F10: [121],
  F11: [122],
  F12: [123],
  F13: [124, 44, 0],
  F14: [125, 145, 0],
  F15: [126, 19, 0],
  F16: [127, 0],
  F17: [128, 0],
  F18: [129, 0],
  F19: [130, 0],
  F20: [229, 131, 0],
  F21: [0, 132],
  F22: [0, 133],
  F23: [0, 134],
  F24: [135, 0],
  Digit1: [49],
  Digit2: [50],
  Digit3: [51],
  Digit4: [52],
  Digit5: [53],
  Digit6: [54],
  Digit7: [55],
  Digit8: [56],
  Digit9: [57],
  Digit0: [48],
  KeyA: [65],
  KeyB: [66],
  KeyC: [67],
  KeyD: [68],
  KeyE: [69],
  KeyF: [70],
  KeyG: [71],
  KeyH: [72],
  KeyI: [73],
  KeyJ: [74],
  KeyK: [75],
  KeyL: [76],
  KeyM: [77],
  KeyN: [78],
  KeyO: [79],
  KeyP: [80],
  KeyQ: [186, 81],
  KeyR: [82],
  KeyS: [83],
  KeyT: [84],
  KeyU: [85],
  KeyV: [86],
  KeyW: [87],
  KeyX: [88],
  KeyY: [89],
  KeyZ: [90],
};

/**
 * return true when key code in key map
 * @param event keyboard event
 * @param type type
 */
export function isKey(event: KeyboardEvent, type: AvailableKey): boolean {
  if (event) {
    const key = event.code;
    // keyCode is used for Safari on Mac
    // tslint:disable-next-line:deprecation
    const code = event.keyCode;

    return key === type || KEY_MAP[type].indexOf(code) !== -1;
  }
}

/**
 * neutralize both propagation and default event
 * @param event event
 */
export function neutralizeEvent(event: Event): void {
  if (event) {
    event.stopPropagation();
    event.preventDefault();
  }
}
