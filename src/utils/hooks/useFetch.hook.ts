import Axios from "axios";
import { useEffect, useState } from "react";

export const useFetch = <T>(url: string): T | null => {
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    async function getData() {
      const { data } = await Axios.get<T | null>(url);
      setData(data);
    }

    getData();

    // NOTE disabled because it also checks T
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return data;
};
