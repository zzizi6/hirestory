import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { StageBadge } from "./StageBadge";
import { formatDate } from "@/lib/formatDate";
import type { Application } from "@/types/application";

interface ApplicationCardProps {
  application: Application;
}

export function ApplicationCard({ application }: ApplicationCardProps) {
  const { id, companyName, position, stage, appliedAt, postingUrl, memo } = application;

  return (
    <article className="flex flex-col gap-3 rounded-xl border border-border bg-background p-5 transition-shadow hover:shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-semibold text-foreground">{companyName}</h3>
          <p className="text-sm text-muted-foreground">{position}</p>
        </div>
        <StageBadge stage={stage} />
      </div>

      <p className="text-xs text-muted-foreground">지원일: {formatDate(appliedAt)}</p>

      {memo && (
        <p className="line-clamp-2 text-sm text-muted-foreground">{memo}</p>
      )}

      <div className="mt-auto flex items-center justify-between pt-1">
        {postingUrl ? (
          <a
            href={postingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
            aria-label={`${companyName} 공고 링크 (새 탭)`}
          >
            공고 보기
            <ExternalLink className="h-3 w-3" aria-hidden="true" />
          </a>
        ) : (
          <span />
        )}
        <Link
          href={`/applications/${id}`}
          className="text-xs text-muted-foreground hover:text-foreground hover:underline"
        >
          상세 보기
        </Link>
      </div>
    </article>
  );
}
