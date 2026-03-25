import { Compass, Wallet, GraduationCap, Brain, Coffee, Laptop } from 'lucide-react';
import React from 'react';

export const CategoryIcons: Record<string, React.ReactNode> = {
  'Money & Finance': <Wallet className="w-5 h-5" />,
  'Students & Career': <GraduationCap className="w-5 h-5" />,
  'Psychology & Life': <Brain className="w-5 h-5" />,
  'Daily Life Problems': <Coffee className="w-5 h-5" />,
  'Tech & Internet': <Laptop className="w-5 h-5" />,
  'Default': <Compass className="w-5 h-5" />
};
