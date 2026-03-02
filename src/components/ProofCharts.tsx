"use client";

import { useMemo, useState } from "react";

import type { ActivityChartPoint } from "@/lib/githubActivity";

interface ProofChartsProps {
  commitsByDay: ActivityChartPoint[];
  issuesByWeek: ActivityChartPoint[];
  commitsByRepo: ActivityChartPoint[];
}

const numberFormatter = new Intl.NumberFormat("en-US");

const chartMax = (points: ActivityChartPoint[]) =>
  points.reduce((max, point) => Math.max(max, point.value), 0);

const VerticalBarChart = ({
  title,
  subtitle,
  points,
  valueLabel,
  tone,
}: {
  title: string;
  subtitle: string;
  points: ActivityChartPoint[];
  valueLabel: string;
  tone: "accent" | "teal";
}) => {
  const [activeIndex, setActiveIndex] = useState(
    points.length > 0 ? points.length - 1 : 0
  );

  const maxValue = useMemo(() => chartMax(points), [points]);
  const activePoint = points[activeIndex] || null;

  const step = 14;
  const barWidth = 9;
  const chartHeight = 136;
  const chartWidth = Math.max(points.length * step + 14, 240);

  if (points.length === 0) {
    return (
      <article className="surface-subtle p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.1em] muted-text">
          {title}
        </p>
        <p className="mt-2 text-sm muted-text">No data available.</p>
      </article>
    );
  }

  return (
    <article className="surface-subtle p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.1em] muted-text">
        {title}
      </p>
      <p className="mt-2 text-sm muted-text">{subtitle}</p>

      <div className="mt-4">
        <svg
          viewBox={`0 0 ${chartWidth} 160`}
          className="h-44 w-full"
          role="img"
          aria-label={title}
        >
          <line
            x1={0}
            y1={145}
            x2={chartWidth}
            y2={145}
            stroke="var(--border)"
            strokeWidth={1}
          />

          {points.map((point, index) => {
            const valueHeight =
              maxValue > 0 ? (point.value / maxValue) * chartHeight : 0;
            const barHeight = Math.max(2, valueHeight);
            const x = 6 + index * step;
            const y = 145 - barHeight;
            const fill = tone === "accent" ? "var(--accent)" : "var(--teal)";
            const opacity = activeIndex === index ? 1 : 0.45;

            return (
              <rect
                key={`${point.label}-${index}`}
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                rx={3}
                fill={fill}
                fillOpacity={opacity}
                className="cursor-pointer transition-opacity"
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                tabIndex={0}
              />
            );
          })}
        </svg>
      </div>

      <div className="mt-2 flex items-baseline justify-between gap-3">
        <p className="truncate text-xs uppercase tracking-[0.08em] muted-text">
          {activePoint ? activePoint.label : "-"}
        </p>
        <p className="text-sm font-semibold text-primary">
          {activePoint ? numberFormatter.format(activePoint.value) : 0} {valueLabel}
        </p>
      </div>
    </article>
  );
};

const ProofCharts = ({
  commitsByDay,
  issuesByWeek,
  commitsByRepo,
}: ProofChartsProps) => {
  const [activeRepoIndex, setActiveRepoIndex] = useState(0);
  const maxRepoValue = useMemo(() => chartMax(commitsByRepo), [commitsByRepo]);
  const activeRepo = commitsByRepo[activeRepoIndex] || null;

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <VerticalBarChart
          title="Commit cadence"
          subtitle="Last 30 days across connected repositories."
          points={commitsByDay}
          valueLabel="commits"
          tone="accent"
        />

        <VerticalBarChart
          title="Issue resolution"
          subtitle="Weekly closed-issue trend over the last 8 weeks."
          points={issuesByWeek}
          valueLabel="issues"
          tone="teal"
        />
      </div>

      <article className="surface-subtle p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.1em] muted-text">
          Commit distribution by repository
        </p>
        <p className="mt-2 text-sm muted-text">
          Top repositories by commit volume in the last 30 days.
        </p>

        {commitsByRepo.length > 0 ? (
          <ul className="mt-5 space-y-3">
            {commitsByRepo.map((point, index) => {
              const percent =
                maxRepoValue > 0 ? (point.value / maxRepoValue) * 100 : 0;
              const isActive = index === activeRepoIndex;

              return (
                <li
                  key={`${point.label}-${index}`}
                  onMouseEnter={() => setActiveRepoIndex(index)}
                  onFocus={() => setActiveRepoIndex(index)}
                  className="cursor-pointer"
                  tabIndex={0}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p
                      className={`truncate text-sm ${
                        isActive ? "text-primary" : "muted-text"
                      }`}
                    >
                      {point.label}
                    </p>
                    <p className="text-sm font-semibold text-primary">
                      {numberFormatter.format(point.value)}
                    </p>
                  </div>

                  <div className="mt-2 h-2 rounded-full bg-[color:var(--code-bg)]">
                    <div
                      className="h-full rounded-full bg-accent transition-all duration-300"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="mt-4 text-sm muted-text">No repository commit data available.</p>
        )}

        <p className="mt-5 text-xs uppercase tracking-[0.08em] muted-text">
          {activeRepo
            ? `Focused repo: ${activeRepo.label} (${numberFormatter.format(
                activeRepo.value
              )} commits)`
            : "Focused repo: -"}
        </p>
      </article>
    </div>
  );
};

export default ProofCharts;
