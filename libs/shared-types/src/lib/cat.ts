export type Cat = {
  id: number;
  name: string;
  imageUrl: string;
  description: string;
  isFavorite: boolean;
  compatibility: {
    apartmentFriendly: number;
    childFriendly: number;
    calm: number;
  };
};
