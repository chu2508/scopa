import { useMemo, useState } from "react";

type Todo = any;

export const useTodoList = () => {
  const [dataSource, setDataSource] = useState<Todo[]>([]);
  const [params, setParams] = useState<{ status?: string }>({});

  const add = (content: string) => {};
  const remove = (todo: Todo) => {};
  const changeTab = (status: string) => {};

  const list = useMemo(() => {
    if (!params.status) return dataSource;
    return dataSource.filter(({ status }) => status === params.status);
  }, [params, dataSource]);

  return { list, add, remove };
};
