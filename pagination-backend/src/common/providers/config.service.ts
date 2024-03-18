import { ConfigService as NestConfig, Path, PathValue } from '@nestjs/config';
import { IConfig } from '../../config/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService<K = IConfig> extends NestConfig<K> {
  public override get<P extends Path<K>>(path: P): PathValue<K, P> {
    const value = super.get(path, { infer: true });
    if (value === undefined) {
      throw new Error('NotFoundConfig: ${path}');
    }
    return value;
  }
}
