'use client';

import { usePathname } from 'next/navigation';

export function SidebarNav() {
  const pathname = usePathname();

  const navItems = [
    {
      href: '/chats',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M8 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4H6Zm7.25-2.095c.478-.86.75-1.85.75-2.905a5.973 5.973 0 0 0-.75-2.906 4 4 0 1 1 0 5.811ZM15.466 20c.34-.588.535-1.271.535-2v-1a5.978 5.978 0 0 0-1.528-4H18a4 4 0 0 1 4 4v1a2 2 0 0 1-2 2h-4.535Z" clipRule="evenodd"/>
        </svg>
      ),
      label: 'Чаты'
    },
    {
      href: '/',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M9 7V2.221a2 2 0 0 0-.5.365L4.586 6.5a2 2 0 0 0-.365.5H9Zm2 0V2h7a2 2 0 0 1 2 2v6.41A7.5 7.5 0 1 0 10.5 22H6a2 2 0 0 1-2-2V9h5a2 2 0 0 0 2-2Z" clipRule="evenodd"/>
          <path fillRule="evenodd" d="M9 16a6 6 0 1 1 12 0 6 6 0 0 1-12 0Zm6-3a1 1 0 0 1 1 1v1h1a1 1 0 1 1 0 2h-1v1a1 1 0 1 1-2 0v-1h-1a1 1 0 1 1 0-2h1v-1a1 1 0 0 1 1-1Z" clipRule="evenodd"/>
        </svg>
      ),
      label: 'Проекты'
    },
    {
      href: '/settings',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeWidth="2" d="M20 6H10m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4m16 6h-2m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4m16 6H10m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4"/>
        </svg>
      ),
      label: 'Настройки'
    }
  ];

  return (
    <div className="h-full flex-1 overflow-y-auto p-3 flex flex-col justify-center">
      <ul className="space-y-2 font-medium">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          
          return (
            <li key={item.href}>
              <a 
                href={item.href}
                className={`flex items-center p-2 rounded-lg group ${
                  isActive 
                    ? 'bg-gray-100 text-gray-900' 
                    : 'text-gray-900 hover:bg-gray-100'
                }`}
                title={item.label}
              >
                <div className={isActive ? 'text-blue-600' : 'text-gray-800'}>
                  {item.icon}
                </div>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}