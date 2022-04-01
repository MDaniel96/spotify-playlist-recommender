import * as Koa from 'koa';

export class PresetController {
  static create(): PresetController {
    return new PresetController();
  }

  constructor() {
    this.list = this.list.bind(this);
  }

  async list(context: Koa.Context): Promise<void> {
    context.body = { message: 'Hello World' };
  }
}
