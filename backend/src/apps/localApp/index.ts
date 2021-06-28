import {UserRepository} from "../common/infra/postgresql/userRepository";
import login from "../../modules/authN/command/handlers/login";
import register from "../../modules/authN/command/handlers/registration";
import knex from "knex";
import {knexSnakeCaseMappers} from "objection";


const main = () => {
  // ENV const
  const connectionString = process.env.MAIN_DB_CONNECTION_STRING
  if (!connectionString) {
    throw new Error("Env variable 'MAIN_DB_CONNECTION_STRING' is required")
  }

  // . DB
  const pg = knex({
    client: "pg",
    connection: connectionString,
    searchPath: ["knex", "public"],
    ...knexSnakeCaseMappers(),
  })

  // . REPOSITORIES
  const userRepo = UserRepository(pg)

  // . USE CASES
  const loginUC = login(userRepo)
  const registerUC = register(userRepo)

  // . SERVER
  // ...
}
