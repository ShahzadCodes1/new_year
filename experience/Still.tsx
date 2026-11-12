/**
 * A frame photographed from the engine itself (`npm run stills`), in landscape and portrait.
 * It is the opening poster, and it is what each chapter shows when motion is reduced or WebGL is missing.
 */
export function Still({ name, eager = false }: { name: string; eager?: boolean }) {
  return (
    <picture className="still">
      <source media="(orientation: portrait)" srcSet={`/stills/${name}-phone.jpg`} />
      {/* Decorative (empty alt). A cover-fitted background whose frame is set in CSS, already sized for both orientations. */}
      <img
        src={`/stills/${name}-desktop.jpg`}
        alt=""
        decoding="async"
        loading={eager ? 'eager' : 'lazy'}
        fetchPriority={eager ? 'high' : 'auto'}
      />
    </picture>
  );
}
