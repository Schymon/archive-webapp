export interface Download {
  label: string;
  url: string;
  passwordRequired: boolean;
  password: string;
  passwordHint?: string;
}

export interface ArchiveItem {
  id: string;
  title: string;
  image: string;
  downloads: Download[];
}

export interface Category {
  id: string;
  title: string;
  items: ArchiveItem[];
}

export interface Config {
  categories: Category[];
}
