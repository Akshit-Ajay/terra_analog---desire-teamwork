import { useState } from 'react';
import { Link } from 'react-router-dom';

const KEY = 'terra-tutorial-dismissed';

function alreadyDismissed(): boolean {
  try {
    return window.localStorage.getItem(KEY) === '1';
  } catch {
    return false; // storage blocked (private mode): show the banner each visit
  }
}

/** One-time invitation to the tutorial. Remembered per browser once dismissed or opened. */
export default function TutorialBanner() {
  const [hidden, setHidden] = useState(alreadyDismissed);
  if (hidden) return null;

  const dismiss = () => {
    try {
      window.localStorage.setItem(KEY, '1');
    } catch {
      /* storage blocked: banner simply returns next visit */
    }
    setHidden(true);
  };

  return (
    <div role="region" aria-label="Tutorial invitation" className="border-b border-line bg-accent-soft">
      <div className="mx-auto flex max-w-content flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="text-sm text-ink">
          <span className="font-semibold">New here?</span>{' '}
          Take the two-minute tutorial to see how to find Earth analogs.
        </p>
        <div className="flex gap-2">
          <Link to="/tutorial" onClick={dismiss} className="btn-primary px-4 py-2">Start tutorial</Link>
          <button type="button" className="btn-ghost px-4 py-2" onClick={dismiss}>Dismiss</button>
        </div>
      </div>
    </div>
  );
}
