export interface IOperations {
  DELETE_TRANSACTION_LOGS_BEFORE: string;
  DROP_CUSTOM_FUNCTION_PROJECT: string;
  SQL: string;
  SYSTEM_INFORMATION: string;
  CLUSTER_STATUS: string;
  ADD_NODE: string;
  UPDATE_NODE: string;
  REMOVE_NODE: string;
  DESCRIBE_ALL: string;
  CREATE_ATTRIBUTE: string;
  CREATE_SCHEMA: string;
  DESCRIBE_SCHEMA: string;
  DROP_SCHEMA: string;
  CREATE_TABLE: string;
  DESCRIBE_TABLE: string;
  DROP_TABLE: string;
  SEARCH_BY_VALUE: string;
  SEARCH_BY_HASH: string;
  SEARCH_BY_CONDITIONS: string;
  CSV_DATA_LOAD: string;
  CSV_URL_LOAD: string;
  CSV_FILE_LOAD: string;
  INSERT: string;
  UPDATE: string;
  UPSERT: string;
  DELETE: string;
  IMPORT_FROM_S3: string;
  EXPORT_TO_S3: string;
  EXPORT_LOCAL: string;
  ADD_USER: string;
  ALTER_USER: string;
  DROP_USER: string;
  LIST_USERS: string;
  LIST_ROLES: string;
  ALTER_ROLE: string;
  ADD_ROLE: string;
  READ_TRANSACTION_LOG: string;
  DELETE_RECORDS_BEFORE: string;
  READ_LOG: string;
  GET_JOB: string;
  CREATE_AUTHENTICATION_TOKENS: string;
  REFRESH_OPERATION_TOKEN: string;
  SEARCH_JOBS_BY_START_DATE: string;
  GET_CUSTOM_FUNCTIONS: string;
  GET_CUSTOM_FUNCTION: string;
  SET_CUSTOM_FUNCTION: string;
  CUSTOM_FUNCTION_STATUS: string;
  DROP_CUSTOM_FUNCTION: string;
  DEPLOY_CUSTOM_FUNCTION_PROJECT: string;
  ADD_CUSTOM_FUNCTION_PROJECT: string;
  PACKAGE_CUSTOM_FUNCTION_PROJECT: string;
  RESTART: string;
  RESTART_SERVICE: string;
  GET_CONFIGUATION: string;
  CONFIGURE_CLUSTER: string;
  DROP_ATTRIBUTE: string;
}
