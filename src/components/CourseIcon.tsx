import { 
  BarChart3, Search, PenTool, Smartphone, DollarSign, TrendingUp,
  type LucideIcon 
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  BarChart: BarChart3,
  Search: Search,
  PenTool: PenTool,
  Smartphone: Smartphone,
  DollarSign: DollarSign,
  TrendingUp: TrendingUp,
};

interface CourseIconProps {
  name: string;
  className?: string;
}

export default function CourseIcon({ name, className = "w-12 h-12" }: CourseIconProps) {
  const IconComponent = iconMap[name];
  if (!IconComponent) return null;
  return <IconComponent className={className} />;
}
