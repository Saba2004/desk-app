export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
};

export type ApiResponse<T> = {
  id?: string;
  image?: string;
  email?: string;
  token?: string;
  name?: string;
  password?: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Incident = {
  id: string;
  name: string;
};

export type Tragedy = {
  id: string;
  name: string;
  incident_id: string;
};

export type Hero = {
  id: string;
  tragedy_id: string | null;
  image: string;
  desc: string;
  position: string;
};

export type HeroForm = {
  image: string;
  desc: string;
  position: string;
};
