import React, { createContext, FC, ReactNode, useState } from 'react';
import useStylesheet from '../hooks/useStylesheet';

interface ThemeContextType {
  selectedTheme: string;
  setSelectedTheme: (value: string) => void;
  colorMode: LayoutColorModeType;
  setColorMode: (value: LayoutColorModeType) => void;
}

/**
 * 테마 컨텍스트.
 */
export const ThemeContext = createContext<ThemeContextType>({
  selectedTheme: 'base',
  setSelectedTheme: (value: string) => {
    throw `${value}를 적용할 수 없습니다. ThemeProvider생성 전에 호출되었습니다.`;
  },
  colorMode: 'light',
  setColorMode: (value: LayoutColorModeType) => {
    throw `${value}를 적용할 수 없습니다. ThemeProvider생성 전에 호출되었습니다.`;
  },
});

export interface ThemeProviderProps {
  defaultTheme: string;
  defaultColorMode: LayoutColorModeType;
  children: ReactNode;
}

/**
 * 테마 프로바이더
 * @param children
 * @param defaultTheme
 * @param defaultColorMode
 * @constructor
 */
export const ThemeProvider: FC<ThemeProviderProps> = ({
  defaultTheme,
  defaultColorMode,
  children,
}) => {
  const [colorMode, setColorMode] = useState<LayoutColorModeType>(
    defaultColorMode
  );

  const [selectedTheme, setSelectedTheme] = useState<string>(defaultTheme);
  useStylesheet(
    selectedTheme ? `/assets/themes/${selectedTheme}/theme.css` : undefined,
    'baseCommon-theme-link'
  );

  // 테마 설정 후 primereact 스타일을 다시 입혀줘야 안깨진다
  useStylesheet('/assets/primereact.min.css', 'baseCommon-prime');

  return (
    <ThemeContext.Provider
      value={{ selectedTheme, setSelectedTheme, colorMode, setColorMode }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
export type LayoutColorModeType = 'light' | 'dark' | 'dim';
