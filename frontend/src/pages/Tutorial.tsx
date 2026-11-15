import { useState } from 'react';
import { Link } from 'react-router-dom';

type Step = {
  title: string;
  where: string; // where in the app this happens
  body: string;
  tip?: string;
};

const STEPS: Step[] = [
  {
    title: 'Choose Moon or Mars',
    where: 'Explorer · left panel · Planetary body',
    body:
      'Pick the world you want Earth matches for. The Moon list holds eight south-polar regions; the Mars list holds four landing-region windows.',
  },
  {
    title: 'Pick a reference region',
    where: 'Explorer · left panel · Reference region',
    body:
      'This is the site Earth will be compared against. Its measured terrain values (local relief, median slope, roughness and others) appear as soon as you select it.',
    tip: 'Good first picks: Shackleton rim or Nobile rim 1 on the Moon, Gale crater region on Mars.',
  },
  {
    title: 'Set the feature weights',
    where: 'Explorer · left panel · Features and weights',
    body:
      'Each terrain feature has a weight. A higher weight makes that feature count more in the ranking. Reset weights puts everything back to the defaults.',
    tip: 'Try lowering one weight, then search again to see how the ranking moves.',
  },
  {
    title: 'Set the search rules',
    where: 'Explorer · left panel · Earth candidates and rules',
    body:
      'Minimum data coverage leaves out candidates with too many missing measurements. Missing-feature penalty sets how heavily a missing measurement counts against a candidate.',
  },
  {
    title: 'Press Find Earth analogs',
    where: 'Explorer · left panel · bottom button',
    body:
      'The analysis server scores every Earth candidate against your reference and returns a ranked list. The map markers recolour to show the result.',
    tip: 'If nothing happens, check that the home page says "Analysis server online".',
  },
  {
    title: 'Read the ranked list',
    where: 'Explorer · Ranked Earth candidates',
    body:
      'Each row shows a similarity index. Filter the list by All types, Named sites or Survey cells. "approx. coords" means a named site\u2019s coordinates are approximate.',
  },
  {
    title: 'Open a result to see why',
    where: 'Explorer · click a row or a map marker',
    body:
      'The detail view compares the candidate with the reference feature by feature, shows what drove the score, and displays slope and elevation charts with terrain images side by side.',
  },
  {
    title: 'Compare candidates',
    where: 'Explorer · Add to compare, then the Compare page',
    body:
      'Use Add to compare on up to three candidates. The Compare page puts them next to the reference with terrain images, similarity index and a feature table.',
  },
  {
    title: 'Check the method and limits',
    where: 'Data & methods page',
    body:
      'See the datasets, how the score is built, the sensitivity analysis and the scientific limitations. The score measures terrain similarity only.',
    tip: 'It is not a landing-site recommendation or a habitability judgement.',
  },
];

export default function Tutorial() {
  const [i, setI] = useState(0);
  const step = STEPS[i];
  const first = i === 0;
  const last = i === STEPS.length - 1;
  const pct = ((i + 1) / STEPS.length) * 100;

  return (
    <div className="pb-section-lg">
      {/* ------------------------------------------------------------ masthead */}
      <header className="border-b border-line bg-surface">
        <div className="mx-auto max-w-content px-4 py-section sm:px-6">
          <p className="label text-accent-ink">Tutorial</p>
          <h1 className="mt-1.5 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            How to use TERRA-ANALOG
          </h1>
          <p className="mt-3 max-w-prose leading-relaxed text-ink-muted">
            Nine short steps, from choosing a Moon or Mars site to reading why an Earth location ranked where it did.
            Follow along in the Explorer, or just read through here first.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link to="/explore" className="btn-primary px-5 py-2.5">Open the Explorer</Link>
            <Link to="/methodology" className="btn-ghost px-5 py-2.5">Data and methodology</Link>
          </div>
        </div>
      </header>

      {/* --------------------------------------------------------------- stepper */}
      <section className="mx-auto mt-section max-w-content px-4 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          {/* Step list */}
          <nav aria-label="Tutorial steps" className="card space-y-1">
            {STEPS.map((s, n) => (
              <button
                key={s.title}
                type="button"
                onClick={() => setI(n)}
                aria-current={n === i ? 'step' : undefined}
                className={`flex w-full items-start gap-3 rounded-md px-2.5 py-2 text-left text-sm transition-colors ${
                  n === i ? 'bg-accent-soft text-ink' : 'text-ink-muted hover:bg-surface-raised hover:text-ink'
                }`}
              >
                <span
                  className={`num mt-px inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold ${
                    n === i ? 'bg-accent text-[#10100f]' : n < i ? 'bg-accent-soft text-accent-ink' : 'bg-surface-sunken text-ink-faint'
                  }`}
                >
                  {n + 1}
                </span>
                <span>{s.title}</span>
              </button>
            ))}
          </nav>

          {/* Current step */}
          <article className="card flex flex-col gap-4" aria-live="polite">
            <div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-sunken" aria-hidden>
                <div className="h-full rounded-full bg-accent transition-all duration-300" style={{ width: `${pct}%` }} />
              </div>
              <p className="label mt-3">Step {i + 1} of {STEPS.length}</p>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight text-ink">{step.title}</h2>
              <p className="mt-1 text-xs text-accent-ink">{step.where}</p>
            </div>

            <p className="leading-relaxed text-ink-muted">{step.body}</p>

            {step.tip && (
              <p className="well text-sm text-ink-muted">
                <span className="font-semibold text-ink">Tip: </span>
                {step.tip}
              </p>
            )}

            <div className="mt-2 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
              <button type="button" className="btn-ghost" disabled={first} onClick={() => setI(i - 1)}>
                ← Back
              </button>
              {last ? (
                <Link to="/explore" className="btn-primary">Try it in the Explorer</Link>
              ) : (
                <button type="button" className="btn-primary" onClick={() => setI(i + 1)}>
                  Next →
                </button>
              )}
            </div>
          </article>
        </div>

        <p className="note-warn mt-6">
          The similarity index compares terrain shape at a 12 km window on a 30 m grid. It is not a probability and says
          nothing about landing safety, habitability or mission suitability.
        </p>
      </section>
    </div>
  );
}
