import { Route } from '../../../types';
import { PresetController } from './preset-controller';

export const presetRoutes: Route[] = [
  {
    method: 'get',
    path: '/api/preset',
    action: PresetController.create().list
  }
];
