export interface SchemaOptions{
   name ? : string;
   fields: object;
   primary_key ? : string;
   silent ? :boolean;
}
export type HarpeeSchemaObject = {
   schemaName: string;
   fields: object;
   primaryKey: string;
   silent:boolean ;

}
export type Schema = (options: SchemaOptions) => HarpeeSchemaObject;