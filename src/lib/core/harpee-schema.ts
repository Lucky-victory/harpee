import Utils from '../helpers/utils';
import { IHarpeeSchemaConfig } from '../interfaces/harpee.interface';
import { HarpeeConfig } from './harpee-config';

/**
 * Let's you specify the schema name, also configure your table's column names.
 */
export class HarpeeSchema {
  private schemaName: string;
  private primaryKey: string;
  private silent: boolean;
  private fields: IHarpeeSchemaConfig['fields'];
  constructor(schemaConfig: IHarpeeSchemaConfig) {
    if (!Utils.isObject(schemaConfig)) {
      throw new TypeError('`schemaConfig` must be an object');
    }
    if (!(schemaConfig.fields || Utils.isObject(schemaConfig.fields))) {
      throw new TypeError(
        ' schemaConfig `fields` is required and must be an object'
      );
    }
    this.schemaName = schemaConfig.name || 'defaultSchema';
    this.primaryKey = schemaConfig.primaryKey || 'id';
    this.silent = schemaConfig.silent || false;
    this.fields = schemaConfig.fields;
    HarpeeConfig.schemaConfig = {
      name: this.schemaName,
      fields: this.fields,
      primaryKey: this.primaryKey,
      silent: this.silent,
    };
  }
}
