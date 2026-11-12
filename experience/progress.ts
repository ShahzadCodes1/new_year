/** Real loading progress for the opening screen: 0 to 1, then `ready` once the scene has drawn its first frames. */
type Listener = (value: number, ready: boolean) => void;

let value = 0;
let ready = false;
const listeners = new Set<Listener>();
const emit = () => listeners.forEach((fn) => fn(value, ready));

export const progress = {
  /** Progress only ever moves forward. */
  set(next: number) {
    if (next > value) {
      value = Math.min(next, 1);
      emit();
    }
  },
  done() {
    value = 1;
    ready = true;
    emit();
  },
  subscribe(fn: Listener): () => void {
    listeners.add(fn);
    fn(value, ready);
    return () => listeners.delete(fn);
  },
};
