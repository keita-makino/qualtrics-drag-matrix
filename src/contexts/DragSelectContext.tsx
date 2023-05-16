import React, { createContext, useState, useEffect, useContext } from 'react';
import DragSelect from 'dragselect';

type ProviderProps = {
  children: React.ReactNode;
  settings?: ConstructorParameters<typeof DragSelect>[0];
};

const DragSelectContext = createContext<DragSelect | undefined>(undefined);

const DragSelectProvider = ({ children, settings = {} }: ProviderProps) => {
  const [ds, setDS] = useState<DragSelect>();

  useEffect(() => {
    setDS((prevState) => {
      if (prevState) return prevState;
      return new DragSelect({});
    });
    return () => {
      if (ds) {
        ds.stop();
        setDS(undefined);
      }
    };
  }, [ds]);

  useEffect(() => {
    ds?.setSettings(settings);
  }, [ds, settings]);

  return (
    <DragSelectContext.Provider value={ds}>
      {children}
    </DragSelectContext.Provider>
  );
};

const useDragSelect = () => {
  return useContext(DragSelectContext);
};

export { DragSelectProvider, useDragSelect };
