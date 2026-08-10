export function getOptionLabel(
  options: { value: string; label: string }[],
  value?: string
) {
  return (
    options.find((option) => option.value === value)
      ?.label ?? "-"
  );
}