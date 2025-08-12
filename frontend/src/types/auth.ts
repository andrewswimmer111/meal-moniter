
export type RegisterInfo = {
  name: string;
  email: string;
  password: string;
  confirmpassword: string;
};

export type LoginInfo = {
  email: string;
  password: string;
}

export type User = {
  id: number;
  name: string;
  email: string;
};

export type UserContextType = {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  loading: boolean
};