import React, { FC, ReactNode } from 'react';
import useStylesheet from '../hooks/useStylesheet';

interface ThemeStoryBookProviderProps {
  theme: string;
  children: ReactNode;
}

/**
 * 스토리북에서 테마 적용.
 * @param children
 * @param theme
 * @constructor
 */
export const ThemeStoryBookProvider: FC<ThemeStoryBookProviderProps> = ({
  children,
  theme = process.env.NEXT_PUBLIC_DEFAULT_THEME,
}) => {
  // const [selectedTheme, setSelectedTheme] = useState<string>('base');
  // return (
  //   <ThemeContext.Provider value={{ selectedTheme, setSelectedTheme }}>
  //     {children}
  //   </ThemeContext.Provider>
  // );
  useStylesheet(`/assets/themes/${theme}/theme.css`);

  return <>{children}</>;
};
