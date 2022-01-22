const operations = {
    SQL: "sql",
    SYSTEM_INFORMATION: "system_information",
    CLUSTER_STATUS: "cluster_status",
    ADD_NODE: "add_node",
    UPDATE_NODE: "update_node",
    REMOVE_NODE: "remove_node",
    DESCRIBE_ALL: "describe_all",
    CREATE_SCHEMA: "create_schema",
    DESCRIBE_SCHEMA: "describe_schema",
    DROP_SCHEMA: "drop_schema",
    CREATE_TABLE: "create_table",
    DESCRIBE_TABLE: "describe_table",
    DROP_TABLE: "drop_table",
    SEARCH_BY_VALUE: "search_by_value",
    SEARCH_BY_HASH: "search_by_hash",
    SEARCH_BY_CONDITIONS: "search_by_conditions",
    CSV_DATA_LOAD: "csv_data_load",
    CSV_URL_LOAD: "csv_url_load",
    CSV_FILE_LOAD: "csv_file_load",
    INSERT: "insert",
    UPDATE: "update",
    DELETE: "delete",
    IMPORT_FROM_S3: "import_from_s3",
    EXPORT_TO_S3: "export_to_s3",
    EXPORT_LOCAL: "export_local",
    ADD_USER: "add_user",
    ALTER_USER: "alter_user",
    DROP_USER: "drop_user",
    LIST_USERS: "list_users",
    LIST_ROLES: "list_roles",
    ALTER_ROLE: "list_role",
    ADD_ROLE: "add_role",
    READ_TRANSACTION_LOG: "read_transaction_log",
    DELETE_TRANSACTION_LOGS: "delete_transaction_logs_before",
    DELETE_RECORDS_BEFORE: "delete_records_before",
    READ_LOG: "read_log",
    GET_JOB: "get_job",
    CREATE_AUTHENTICATION_TOKENS: "create_authentication_tokens",
    REFRESH_OPERATION_TOKEN: "refresh_operation_token",
    SEARCH_JOBS_BY_START_DATE: "search_jobs_by_start_date",
    GET_CUSTOM_FUNCTIONS: "get_custom_functions",
    GET_CUSTOM_FUNCTION: "get_custom_function",
    DROP_CUSTOM_FUNCTION: "drop_custom_function",
    DEPLOY_CUSTOM_FUNCTION_PROJECT: "deploy_custom_function_project",
    ADD_CUSTOM_FUNCTION_PROJECT: "add_custom_function_project",
    PACKAGE_CUSTOM_FUNCTION_PROJECT: "package_custom_function_project",
    RESTART:'restart',
    RESTART_SERVICE:'restart_service',
    GET_CONFIGUATION:
    'get_configuation'
};
export default operations;
