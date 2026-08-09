export type RegisterRequest = {
  name: string;
  username: string;
  email: string;
  password: string;
};

export type RegisterResponse = {
  userId: string;
  name: string;
  username: string;
  email: string;
};
