import { useTranslation } from "react-i18next";
import { UpDownStack } from "./UpDownStack";
import { NetworkUpDownStack } from "./NetworkUpDownStack";
import { useNodeList } from "@/contexts/NodeListContext";
import { useLiveData } from "@/contexts/LiveDataContext";
import { formatBytes, formatUptime } from "./Node";
import { Text, Card } from "@radix-ui/themes";

type DetailsGridProps = {
  uuid: string;
  gap?: string;
  align?: "start" | "center" | "end";
};

export const DetailsGrid = ({ uuid, gap, align }: DetailsGridProps) => {
  const { t } = useTranslation();

  const { nodeList } = useNodeList();
  const { live_data } = useLiveData();
  const node = nodeList?.find((n) => n.uuid === uuid);

  return (
    <Card>

      {/* title */}
      <Text as="p" mb="2" size="4" weight="bold">
        系统信息
      </Text>

      <div
        className={`flex flex-wrap gap-${gap ?? "4"} max-w-180 basis-full justify-center ${align === "center" ? "justify-between" : ""
          }`}
      >
        {/* line1 */}
        <UpDownStack
          className="md:w-128 flex-[0_0_calc(50%-0.5rem)]"
          up="CPU"
          down={`${node?.cpu_name} (x${node?.cpu_cores})`}
        />
        <label className={`flex flex-wrap gap-2 gap-x-8 flex-[0_0_calc(50%-0.5rem)] ${align === "center" ? "start" : ""}`}>
          <UpDownStack
            up={t("nodeCard.arch")}
            down={node?.arch ?? "Unknown"}
          />
          <UpDownStack
            up={t("nodeCard.virtualization")}
            align={"start"}
            down={node?.virtualization ?? "Unknown"}
          />
        </label>

        {/* line2 */}
        <UpDownStack up="GPU" down={node?.gpu_name ?? "Unknown"} className="flex-[0_0_calc(50%-0.5rem)]" />
        <label className={`flex flex-wrap gap-2 gap-x-8 flex-[0_0_calc(50%-0.5rem)] ${align === "center" ? "start" : ""}`}>
          <UpDownStack
            up={t("nodeCard.os")}
            align={"start"}
            down={node?.os ?? "Unknown"}
          />
        </label>

        {/* line3 */}
        <NetworkUpDownStack
          className="md:w-64 w-full flex-[0_0_calc(50%-0.5rem)]"
          up={t("nodeCard.networkSpeed")}
          // align={align === "center" ? "start" : "end"}
          down1={` ↑ ${formatBytes(
            live_data?.data.data[uuid ?? ""]?.network.up || 0
          )}/s
          `}
          down2={`↓
          ${formatBytes(
            live_data?.data.data[uuid ?? ""]?.network.down || 0
          )}/s
          `}
        />
        <label className={`flex flex-wrap gap-2 gap-x-8 flex-[0_0_calc(50%-0.5rem)] ${align === "center" ? "start" : ""}`}>
        <NetworkUpDownStack
          up={t("nodeCard.totalTraffic")}
          align={"start"}
          className="flex-[0_0_calc(50%-0.5rem)]"
          down1={`↑
          ${formatBytes(
            live_data?.data.data[uuid ?? ""]?.network.totalUp || 0
          )}
          `}
          down2={`↓
          ${formatBytes(
            live_data?.data.data[uuid ?? ""]?.network.totalDown || 0
          )}
          `}
        />
        </label>

        {/* line4 */}
        <UpDownStack
          className="md:w-70 w-full flex-[0_0_calc(50%-0.5rem)]"
          up={t("nodeCard.ram")}
          down={formatBytes(node?.mem_total || 0)}
        />
        <label className={`flex flex-wrap gap-2 gap-x-8 flex-[0_0_calc(50%-0.5rem)] ${align === "center" ? "start" : ""}`}>
          <UpDownStack
            up={t("nodeCard.disk")}
            down={formatBytes(node?.disk_total || 0)}
          />
          <UpDownStack
            up={t("nodeCard.swap")}
            align={"start"}
            down={formatBytes(node?.swap_total || 0)}
          />
        </label>

        {/* line5 */}
        <UpDownStack
          up={t("nodeCard.uptime")}
          className="flex-[0_0_calc(50%-0.5rem)]"
          down={
            live_data?.data.data[uuid ?? ""]?.uptime
              ? formatUptime(live_data?.data.data[uuid ?? ""]?.uptime, t)
              : "-"
          }
        />
        <label className={`flex flex-wrap gap-2 flex-[0_0_calc(50%-0.5rem)] ${align === "center" ? "start" : ""}`}>
          <UpDownStack
            up={t("nodeCard.last_updated")}
            // className="flex-[0_0_calc(50%-0.5rem)]"
            align={"start"}
            down={node?.updated_at
              ? new Date(
                live_data?.data.data[uuid ?? ""]?.updated_at ||
                node.updated_at
              ).toLocaleString()
              : "-"
            }
          />
        </label>
      </div>
    </Card>
  );
};
