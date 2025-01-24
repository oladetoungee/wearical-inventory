'use client';

import React from 'react';
import { HandCoins, Percent, ShoppingCartIcon, UserSquare2 } from 'lucide-react';
import { useDashboardStats } from '@/lib/hooks/total'; // Adjust to your actual hook path

export const DashboardHome = () => {
  const { totalRevenue, totalSales, totalProducts, totalEmployees } = useDashboardStats();

  const ctaData = [
    {
      icon: HandCoins,
      title: 'Total Revenue',
      value: totalRevenue ,
      bgColor: 'bg-blue-500',
    },
    {
      icon: Percent,
      title: 'Total Sales',
      value: totalSales,
      bgColor: 'bg-green-500',
    },
    {
      icon: ShoppingCartIcon,
      title: 'Total Products',
      value: totalProducts,
      bgColor: 'bg-orange-500',
    },
    {
      icon: UserSquare2,
      title: 'Total Employees',
      value: totalEmployees,
      bgColor: 'bg-purple-500',
    },
  ];

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
              <div
                className={`rounded-full p-2 inline-flex ${cta.bgColor} transition-transform duration-300 hover:-translate-y-1`}
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
