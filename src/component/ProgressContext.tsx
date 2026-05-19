import React, { createContext, useState, useContext, ReactNode } from 'react';

// 1. Tip tanımı (TypeScript için)
interface ProgressContextType {
  completedModules: { [key: string]: boolean };
  finishModule: (moduleName: string) => void;
}

// 2. Context oluşturma
const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider = ({ children }: { children: ReactNode }) => {
  const [completedModules, setCompletedModules] = useState({
    modul1: false,
    modul2: false,
    modul3: false,
    modul4: false,
    modul5: false
  });

  const finishModule = (moduleName: string) => {
    setCompletedModules(prev => ({ ...prev, [moduleName]: true }));
  };

  return (
    <ProgressContext.Provider value={{ completedModules, finishModule }}>
      {children}
    </ProgressContext.Provider>
  );
};

// 3. BURASI ÇOK ÖNEMLİ: Custom Hook
export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress bir ProgressProvider içinde kullanılmalıdır!');
  }
  return context;
};