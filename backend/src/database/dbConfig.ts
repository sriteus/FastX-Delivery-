interface PostgresConfig {
  user: string;
  host: string;
  database: string;
  password: string;
  port: number;
}

const postgresdb: PostgresConfig = {
  user: "postgres",
  host: "localhost",
  database: "FastX",
  password: "root",
  port: 5432,
};

// Export the configurations
export default {
  postgresdb,
};
