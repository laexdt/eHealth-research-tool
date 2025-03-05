import { Pool } from "pg";

const pool = new Pool({
    user: window.RUNTIME_CONFIG.POSTGRES_USER,
    host: window.RUNTIME_CONFIG.POSTGRES_HOST,
    database: window.RUNTIME_CONFIG.POSTGRES_DB,
    password: window.RUNTIME_CONFIG.POSTGRES_PASSWORD,
    port: parseInt(window.RUNTIME_CONFIG.POSTGRES_PORT || "5432"),
});
export default pool;
