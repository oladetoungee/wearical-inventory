import React from 'react';
import { HandCoins, Percent, ShoppingCartIcon, UserSquare2 } from 'lucide-react';

const ctaData = [
  {
    icon: HandCoins,
    title: 'Total Revenue',
    value: 'N500,000',
    bgColor: 'bg-blue-500',
  },
  {
    icon: Percent,
    title: 'Total Sales',
    value: '5,000',
    bgColor: 'bg-green-500',
  },
  {
    icon: ShoppingCartIcon,
    title: 'Total Products',
    value: '5,000',
    bgColor: 'bg-orange-500',
  },
  {
    icon: UserSquare2,
    title: 'Total Employees',
    value: '500',
    bgColor: 'bg-purple-500',
  },
];

export const DashboardHome = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:gap-2 gap-6 mt-4">
      {ctaData.map((cta, index) => {
        const Icon = cta.icon;
        return (
          <div
            key={index}
            className={`rounded-lg shadow-md p-4 text-white ${cta.bgColor} transform transition-all duration-300 hover:scale-105 hover:rotate-1 hover:shadow-xl`}
          >
            <div className="space-y-2 text-left">
              {/* Floating Icon Animation */}
              <div
                className={`rounded-full p-2 inline-flex ${cta.bgColor} transition-transform duration-300 hover:translate-y-[-4px]`}
                style={{ opacity: 0.6 }}
              >
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-sm">{cta.title}</h3>
              <p className="text-base font-medium mt-1">{cta.value}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
