type Props = {
  title: string;
  fileName?: string | null;
  documentText: string;
};

export default function EditorUploadedContent({
  title,
  fileName,
  documentText,
}: Props) {
  const paragraphs = documentText
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);

  return (
    <div className="space-y-md font-body-md leading-[1.6] text-[#333333] dark:text-surface-bright">
      <div className="border-b border-outline-variant/20 pb-md dark:border-outline-variant/40">
        <h2 className="font-headline-sm text-center uppercase underline">
          {title}
        </h2>
        {fileName ? (
          <p className="mt-2 text-center text-xs text-on-surface-variant dark:text-surface-variant">
            Source file: {fileName}
          </p>
        ) : null}
      </div>
      {paragraphs.map((paragraph) => (
        <p key={paragraph.slice(0, 48)} className="whitespace-pre-wrap">
          {paragraph}
        </p>
      ))}
    </div>
  );
}
