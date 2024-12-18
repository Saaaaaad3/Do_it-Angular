export interface Card {
  id: number;
  title: string;
  description?: string;
  isEditing?: boolean;
}

export interface List {
  id: number;
  title: string;
  cards: Card[];
}
