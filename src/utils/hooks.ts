import qs from "qs";
import { useEffect, useMemo, useReducer, useRef, useState } from "react";
import { unstable_batchedUpdates } from "react-dom";
import { useLocation } from "react-router-dom";

export const useForceUpdate = () => {
  const [, forceUpdateDispatch] = useReducer((v) => v + 1, 0);

  return forceUpdateDispatch;
};

export const usePrevious = (data: any) => {
  const ref = useRef();

  useEffect(() => {
    ref.current = data;
  }, [data]);

  return ref.current;
};

export const useQuery = () => {
  const location = useLocation();

  return useMemo(() => {
    return qs.parse(location.search.replace(/^\?/, ""), {
      ignoreQueryPrefix: true,
    });
  }, [location.search]);
};

export function useList<
  I extends Record<string, any> = any,
  F extends Record<string, any> = {}
>(options: {
  onGetListData: (
    query: { currPage: number; pageSize: number } & F
  ) => Promise<{
    data: I[];
    total: number;
  }>;
}) {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<I[]>([]);
  const [filter, setFilter] = useState<F>({} as F);
  const [paging, setPaging] = useState({
    currPage: 0,
    pageSize: 10,
    totalItems: 0,
    totalPage: 0,
  });

  const getPageList = async () => {
    const isFirstPage = paging.currPage === 1;

    setLoading(true);

    try {
      const query = {
        ...filter,
        currPage: paging.currPage,
        pageSize: paging.pageSize,
      };

      Object.keys(query).forEach((key) => {
        if (query[key] === "") {
          delete query[key];
        }
      });

      const data = await options.onGetListData(query);

      if (isFirstPage) {
        setItems(data.data);
      } else {
        setItems([...items, ...data.data]);
      }

      setPaging({
        ...paging,
        totalItems: data.total,
        totalPage: Math.ceil(data.total / paging.pageSize),
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (paging.currPage !== 0) {
      getPageList();
    }
  }, [filter, paging.currPage, paging.pageSize]);

  return {
    items,
    loading,
    paging,
    getPageList,
    setCurrentPage(current: number) {
      setPaging({
        ...paging,
        currPage: current,
      });
    },
    setPageSize(size: number) {
      setPaging({
        ...paging,
        currPage: 1,
        pageSize: size,
      });
    },
    setFilter(_filter: Partial<F>) {
      unstable_batchedUpdates(() => {
        setFilter({
          ...filter,
          ..._filter,
        });
        setPaging({
          ...paging,
          currPage: 1,
        });
      });
    },
  };
}

export function useDetail<I extends Record<string, any> = any>(options: {
  onGetDetailData: () => Promise<I>;
}) {
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState<I>({} as I);

  const getDetailData = async () => {
    setLoading(true);

    try {
      const data = await options.onGetDetailData();

      setItem(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    item,
    getDetailData,
  };
}

export function useModal<P extends Record<string, any> = any>() {
  const [visible, setVisible] = useState(false);
  const [payload, setPayload] = useState<P>({} as P);

  const showModal = (data = {} as P) => {
    setPayload(data);
    setVisible(true);
  };
  const hideModal = () => {
    setPayload({} as P);
    setVisible(false);
  };

  return {
    visible,
    payload,
    showModal,
    hideModal,
  };
}

export function useForm<F extends Record<string, any> = any>(options: {
  fields: F;
  onSubmit: () => any;
}) {
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState<F>(Object.assign({}, options.fields));

  const submit = async () => {
    setLoading(true);
    try {
      await options.onSubmit();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    fields,
    setFields(_fields: Partial<F>) {
      //实时更新
      Object.assign(fields, _fields);

      setFields({
        ...fields,
      });
    },
    async submit() {
      submit();
    },
  };
}
