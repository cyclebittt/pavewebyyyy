export default function ProofBlocks({ items = [] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {items.map((it, i) => {
        const box = (
          <div
            key={i}
            className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 md:p-6"
          >
            {/* KOPF */}
            {(it.eyebrow || it.title) && (
              <div className="mb-3">
                {it.eyebrow && (
                  <span className="inline-block text-xs tracking-wider text-indigo-300/80 bg-white/5 border border-white/10 rounded-full px-2.5 py-1">
                    {it.eyebrow}
                  </span>
                )}
                {it.title && (
                  <h3 className="mt-2 text-xl font-semibold text-white">{it.title}</h3>
                )}
              </div>
            )}

            {/* INHALT */}
            {it.type === "kpi" && (
              <div className="text-center">
                <div className="text-5xl font-extrabold text-indigo-300">{it.value}</div>
                {it.note && <p className="mt-2 text-neutral-300">{it.note}</p>}
              </div>
            )}

            {it.type === "quote" && (
              <figure>
                <blockquote className="text-neutral-200 leading-relaxed">“{it.text}”</blockquote>
                <figcaption className="mt-3 text-sm text-neutral-400">
                  {it.author && <span className="text-white font-medium">{it.author}</span>}
                  {it.role && <> · {it.role}</>}
                </figcaption>
              </figure>
            )}

            {it.type === "video" && (
              <div className="aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-black/30">
                {/* Demo/Case-Teaser (mp4/loom/embed möglich). Platzhalter: */}
                <video controls className="w-full h-full object-cover" poster={it.poster || ""}>
                  {it.src && <source src={it.src} type="video/mp4" />}
                </video>
                {it.caption && (
                  <p className="mt-2 text-sm text-neutral-400">{it.caption}</p>
                )}
              </div>
            )}

            {it.type === "image" && (
              <div>
                <div className="rounded-xl overflow-hidden border border-white/10">
                  <img src={it.src} alt={it.alt || ""} className="w-full h-full object-cover" />
                </div>
                {it.caption && (
                  <p className="mt-2 text-sm text-neutral-400">{it.caption}</p>
                )}
              </div>
            )}

            {it.type === "beforeAfter" && (
              <div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg overflow-hidden border border-white/10">
                    <img src={it.before} alt="Vorher" className="w-full h-full object-cover" />
                  </div>
                  <div className="rounded-lg overflow-hidden border border-white/10">
                    <img src={it.after} alt="Nachher" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="mt-2 flex items-center justify-between text-xs text-neutral-400">
                  <span>Vorher</span><span>Nachher</span>
                </div>
              </div>
            )}

            {it.type === "steps" && Array.isArray(it.steps) && (
              <ol className="space-y-3">
                {it.steps.map((s, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600/25 text-indigo-200 text-xs">{idx+1}</span>
                    <div>
                      <div className="font-medium text-white">{s.title}</div>
                      {s.desc && <p className="text-neutral-300 text-sm">{s.desc}</p>}
                    </div>
                  </li>
                ))}
              </ol>
            )}

            {it.type === "rich" && it.children}
          </div>
        );

        return box;
      })}
    </div>
  );
}
