export type FilterFieldType = 'text' | 'select';

export interface FilterOption {
  label: string;
  value: string | boolean;
}

export interface FilterField {
  key: string;
  label: string;
  type: FilterFieldType;
  required?: boolean;
  options?: FilterOption[];
}

export type FilterValues = Record<string, string | boolean | undefined>;
