import { Card } from '../ui/Card';

interface StatsCardProps {
  label: string;
  value: string;
  change: string;
  color: 'mint' | 'sage';
}

export const StatsCard = ({ label, value, change, color }: StatsCardProps) => {
  const colorMap = {
    mint: { value: 'text-mint', badge: 'text-mint bg-mint/10' },
    sage: { value: 'text-sage', badge: 'text-sage bg-sage/10' },
  };

  return (
    <Card className="flex flex-col gap-2">
      <span className="text-xs font-bold text-gray-400 uppercase">{label}</span>
      <p className={`text-3xl font-black ${colorMap[color].value}`}>{value}</p>
      <div className={`flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full w-fit ${colorMap[color].badge}`}>
        <span>{change}</span>
      </div>
    </Card>
  );
};

export default StatsCard;
