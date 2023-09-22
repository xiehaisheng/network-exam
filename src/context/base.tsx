import React, { useContext } from "react";

export const createContext = <D extends Record<string, any>>(
  useData: () => D
) => {
  const Context = React.createContext<D>({} as D);

  return {
    useProvider: (): D & { Provider: React.FC } => {
      const data = useData();

      return {
        ...data,
        Provider: (props) => {
          return (
            <Context.Provider value={data}>{props.children}</Context.Provider>
          );
        },
      };
    },
    useContext: () => {
      return useContext(Context);
    },
  };
};
