import { Text } from "@radix-ui/themes";

export function NetworkUpDownStack({
  up,
  down1,
  down2,
  className,
  align = "start",
}: {
  up: string;
  down1: string;
  down2: string;
  className?: string;
  align?: "start" | "center" | "end";
}) {
  const alignClass = {
    start: "items-start",
    center: "items-center", 
    end: "items-end"
  }[align];

  return (
    <div className={`flex flex-col gap-0 ${alignClass} ${className}`}>
      <Text size="2" weight="bold">{up}</Text>
      <label className="text-sm text-muted-foreground -mt-1">{down1}</label>
      <label className="text-sm text-muted-foreground -mt-1">{down2}</label>
    </div>
  );
}