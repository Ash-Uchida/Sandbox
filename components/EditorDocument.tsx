import type { SampleDocument } from "@/lib/editor/sample-document";

type Props = {
  document: SampleDocument;
};

export default function EditorDocument({ document }: Props) {
  return (
    <div className="space-y-md text-[#333333] font-body-md leading-[1.6] dark:text-surface-bright">
      <h2 className="font-headline-sm text-center mb-xl underline uppercase">
        {document.heading}
      </h2>
      {document.sections.map((section) => (
        <div key={section.title} className="space-y-md">
          <p>
            <span className="font-bold">{section.title}</span>
          </p>
          {section.paragraphs.map((paragraph, index) => {
            const highlighted = section.highlightIndex === index;
            if (!highlighted) {
              return <p key={paragraph.slice(0, 24)}>{paragraph}</p>;
            }

            return (
              <div key={paragraph.slice(0, 24)} className="relative group">
                <div className="p-md border-2 border-primary-container bg-primary-container/5 rounded-lg -mx-md transition-all">
                  <p className="relative z-10">{paragraph}</p>
                  <div className="absolute -top-12 right-0 bg-primary-container text-on-primary-container px-md py-sm rounded-lg shadow-lg flex items-center gap-sm">
                    <span
                      className="material-symbols-outlined text-[18px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      auto_awesome
                    </span>
                    <span className="font-label-md text-label-md">
                      AI flagged this clause for review
                    </span>
                    <div className="w-1.5 h-1.5 rounded-full bg-white animate-bounce" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
