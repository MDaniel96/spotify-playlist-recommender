export type Preset = {
  id: number;
  name: string;
  userId: number;
  createdAt: Date;
};

export type PresetUpsertPayload = Omit<Preset, 'id' | 'createdAt'>;
