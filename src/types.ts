export interface UserProps {
  id?: string,
  username?: string,
  nickname?: string,
  firstName?: string,
  lastName?: string,
  email?: string,
  password?: string,
  profileImage?: string,
}

export interface ItemProps {
  id?: string,
  itemName: string,
  createDate: string,
  description: string,
  rentCount: number,
  loanDurationDays: number,
  itemImage: string,
  userId: string,
  status: string,
  user?: UserProps
  username?: string,
  categories: CategoriesProps[]
}

export interface CategoriesProps {
  id: string,
  name: string,
}

export interface LoginProps {
  setLoggedIn: (loggedIn: boolean) => void;
}
