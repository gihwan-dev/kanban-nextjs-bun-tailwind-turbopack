"use client";

import React, { useEffect, useState } from "react";
import OvalSvg from "../OvalSvg";
import BodyColumnItem from "./BodyColumnItem/BodyColumnItem";
import randomColor from "randomcolor";
import axios from "axios";
import { SERVER_URL } from "@/const";
import { useQuery } from "@tanstack/react-query";

export type GetColumnsTaskDto = {
  task_id?: number;
  title: string;
  total: number;
  done: number;
};

const getTasksAxios = (columnId: number | undefined) => {
  if (!columnId) {
    throw new Error("columnId is undefined");
  }
  return axios.get<GetColumnsTaskDto[]>(`${SERVER_URL}/column/${columnId}`);
};

const BodyColumn: React.FC<{
  title: string | undefined;
  columnId: number | undefined;
}> = ({ title, columnId }) => {
  const [color, setColor] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["tasks", columnId],
    queryFn: () => getTasksAxios(columnId),
  });

  useEffect(() => {
    setColor(randomColor());
  }, []);

  return (
    <div className="w-72 flex flex-col gap-6 h-full box-border flex-shrink-0 overflow-x-hidden">
      <header className="flex flex-row gap-3 items-center text-xs font-bold -text--Medium-Grey">
        <OvalSvg fill={color} />
        <span>
          {title?.toUpperCase()} ( {data?.data.length} )
        </span>
      </header>
      <section className="flex flex-col h-full w-full overflow-y-auto gap-5">
        {data?.data.map(item => {
          return (
            <BodyColumnItem
              key={`${item.task_id} body task`}
              taskId={item.task_id}
              title={item.title}
              total={item.total}
              done={item.done}
            />
          );
        })}
      </section>
    </div>
  );
};

export default BodyColumn;
