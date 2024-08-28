import { useContext } from 'react';
import { ThemeContext } from '../providers/ThemeProvider';

/**
 * 테마 dropdown 데이터
 */
export const themeNames = [
  { name: 'fillin', code: 'fillin' },
  { name: 'arya-blue', code: 'arya-blue' },
  { name: 'arya-green', code: 'arya-green' },
  { name: 'arya-orange', code: 'arya-orange' },
  { name: 'arya-purple', code: 'arya-purple' },
  { name: 'base', code: 'base' },
  { name: 'bootstrap4-dark-blue', code: 'bootstrap4-dark-blue' },
  { name: 'bootstrap4-dark-purple', code: 'bootstrap4-dark-purple' },
  { name: 'bootstrap4-light-blue', code: 'bootstrap4-light-blue' },
  { name: 'bootstrap4-light-purple', code: 'bootstrap4-light-purple' },
  { name: 'fluent-light', code: 'fluent-light' },
  { name: 'luna-amber', code: 'luna-amber' },
  { name: 'luna-blue', code: 'luna-blue' },
  { name: 'luna-green', code: 'luna-green' },
  { name: 'luna-pink', code: 'luna-pink' },
  { name: 'md-dark-deeppurple', code: 'md-dark-deeppurple' },
  { name: 'md-dark-indigo', code: 'md-dark-indigo' },
  { name: 'md-light-deeppurple', code: 'md-light-deeppurple' },
  { name: 'md-light-indigo', code: 'md-light-indigo' },
  { name: 'mdc-dark-deeppurple', code: 'mdc-dark-deeppurple' },
  { name: 'mdc-dark-indigo', code: 'mdc-dark-indigo' },
  { name: 'mdc-light-deeppurple', code: 'mdc-light-deeppurple' },
  { name: 'mdc-light-indigo', code: 'mdc-light-indigo' },
  { name: 'nova', code: 'nova' },
  { name: 'nova-accent', code: 'nova-accent' },
  { name: 'nova-alt', code: 'nova-alt' },
  { name: 'rhea', code: 'rhea' },
  { name: 'saga-blue', code: 'saga-blue' },
  { name: 'saga-green', code: 'saga-green' },
  { name: 'saga-orange', code: 'saga-orange' },
  { name: 'saga-purple', code: 'saga-purple' },
  { name: 'vela-blue', code: 'vela-blue' },
  { name: 'vela-green', code: 'vela-green' },
  { name: 'vela-orange', code: 'vela-orange' },
  { name: 'vela-purple', code: 'vela-purple' },
];

/**
 * 테마를 context에 저장하고 가져옵니다.
 */
export default function useTheme() {
  const {
    selectedTheme,
    setSelectedTheme,
    colorMode,
    setColorMode,
  } = useContext(ThemeContext);

  return { selectedTheme, setSelectedTheme, colorMode, setColorMode };
}
