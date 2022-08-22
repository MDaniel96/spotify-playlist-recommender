export type Preset = {
  id: number;
  name: string;
  userId: number;
  createdAt: Date;
};

export type PresetUpsertPayload = Omit<Preset, 'id' | 'createdAt'>;

export type User = {
  id: number;
  email: string;
  password: string;
};
