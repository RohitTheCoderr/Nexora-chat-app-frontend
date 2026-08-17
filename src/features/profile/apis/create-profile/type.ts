export type profile = {
  name: string;
  username: string;
  bio?: string;
  phone?: string;
  avatar?: File;
};

export type createProfileReq = profile;
