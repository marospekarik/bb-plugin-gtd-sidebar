/**
 * The status overlay drawn on a sidebar row: a soft, full-bleed tint inside
 * the row's rounding that says what the thread is waiting on at a glance,
 * without shouting. Green for a thread whose work has landed and is done,
 * yellow for a thread that is blocked on its user's permission or answer.
 */

export type ThreadOverlayTone = "await" | "done" | "none";

/** The tint class on the row, keyed by tone. */
export const OVERLAY_TONE_CLASS: Record<ThreadOverlayTone, string> = {
  await: "gtd-overlay-await",
  done: "gtd-overlay-done",
  none: "",
};

/**
 * Which overlay a row draws.
 *
 * "Await" is the one state that must outrank everything else: a raised hand
 * is a live question, and the list already routes it to the top shelf, so its
 * tint should agree. "Done" is an archived thread still on the shelf (the
 * undo window) — a finished state, shown gently. Everything else draws no
 * overlay: the row's normal background is already the neutral resting state.
 */
export function overlayForShelf(shelf: string): ThreadOverlayTone {
  switch (shelf) {
    case "await":
      return "await";
    case "settled":
    case "done":
      return "done";
    default:
      return "none";
  }
}
