import { Config } from '../entities/config';

export interface IConfigRepository {
  find(): Promise<Config>;
  update(config: Config): Promise<Config>;
}