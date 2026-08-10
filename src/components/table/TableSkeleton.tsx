"use client";

interface Props {
  rows?: number;
  columns?: number;
}

export default function TableSkeleton({
  rows = 8,
  columns = 6,
}: Props) {
  return (
    <tbody>
      {Array.from({ length: rows }).map((_, row) => (
        <tr
          key={row}
          className="border-b"
        >
          {Array.from({ length: columns }).map((_, col) => (
            <td
              key={col}
              className="px-6 py-5"
            >
              <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}