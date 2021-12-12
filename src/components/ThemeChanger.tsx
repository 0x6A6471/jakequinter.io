import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { HiOutlineSun, HiOutlineMoon } from 'react-icons/hi';
import { Switch } from '@headlessui/react';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const handleTheme = () => {
    const targetTheme = theme === 'light' ? 'dark' : 'light';

    setTheme(targetTheme);
  };

  return (
    <Switch
      checked={theme === 'light'}
      onChange={handleTheme}
      className={
        'relative bg-gray-100 dark:bg-gray-800 inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-0'
      }
    >
      <span className="sr-only">Change light/dark mode</span>
      <span
        className={`${
          theme === 'light' ? 'translate-x-5' : 'translate-x-0'
        } pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
      >
        <span
          className={`
            ${
              theme === 'light'
                ? 'opacity-0 ease-out duration-100'
                : 'opacity-100 ease-in duration-200'
            }
            'absolute bg-gray-800 border border-yellow-400 rounded-full inset-0 h-full w-full flex items-center justify-center transition-opacity'
          `}
          aria-hidden="true"
        >
          <HiOutlineSun className="text-yellow-400 z-10" />
        </span>
        <span
          className={`${
            theme === 'light'
              ? 'opacity-0 ease-out duration-100'
              : 'opacity-100 ease-in duration-200'
          } absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`}
          aria-hidden="true"
        >
          <HiOutlineSun />
        </span>
        <span
          className={`${
            theme === 'light'
              ? 'opacity-100 ease-in duration-200'
              : 'opacity-0 ease-out duration-100'
          } absolute bg-gray-800 border border-gray-400 rounded-full inset-0 h-full w-full flex items-center justify-center transition-opacity`}
          aria-hidden="true"
        >
          <HiOutlineMoon className="text-gray-400 z-10" />
        </span>
      </span>
    </Switch>
  );
}
