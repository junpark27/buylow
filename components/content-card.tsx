interface ContentCardProps {
  title: string;
  description?: string;
  imageUrl?: string;
  badge?: string;
  href: string;
  ctaText?: string;
}

export default function ContentCard({
  title,
  description,
  imageUrl,
  badge,
  href,
  ctaText = "자세히 보기",
}: ContentCardProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block overflow-hidden rounded-xl border border-dark-border bg-dark-card transition-colors hover:border-gold/30"
    >
      {imageUrl && (
        <div className="aspect-video w-full overflow-hidden bg-dark-border">
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        </div>
      )}
      <div className="p-4">
        {badge && (
          <span className="mb-2 inline-block rounded bg-gold/15 px-2 py-0.5 text-xs font-semibold text-gold">
            {badge}
          </span>
        )}
        <h3 className="mb-1 text-sm font-bold leading-snug">{title}</h3>
        {description && (
          <p className="mb-3 text-xs text-dark-muted line-clamp-2">
            {description}
          </p>
        )}
        <span className="text-xs font-semibold text-gold">{ctaText} →</span>
      </div>
    </a>
  );
}
