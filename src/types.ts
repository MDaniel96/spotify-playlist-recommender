export type Preset = {
  id: number;
  name: string;
  userId: number;
  createdAt: Date;
};

export type PresetInsertPayload = Omit<Preset, 'id' | 'createdAt'>;
