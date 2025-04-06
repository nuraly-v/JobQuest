
import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <div className="relative max-w-md w-full">
      <Search className="h-4 w-4 absolute top-1/2 left-3 transform -translate-y-1/2 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search by company, position or location..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-9"
      />
    </div>
  );
};

export default SearchBar;
