export type Preset = {
  id: number;
  name: string;
  user: User;
  createdAt: Date;
};

export type PresetUpsertPayload = Omit<Preset, 'id' | 'user' | 'createdAt'>;

export type User = {
  id: number;
  email: string;
  password: string;
};
