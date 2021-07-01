import {UserRepository} from "../common/infra/postgresql/userRepository";
import login from "../../modules/authN/command/features/login";
import register from "../../modules/authN/command/features/registration";
import knex from "knex";
import {knexSnakeCaseMappers} from "objection";
import {InternalError} from "../../libs/dddfn/errors";

require('dotenv').config()

export const app = () => {
  // ENV const
  const connectionString = process.env.MAIN_DB_CONNECTION_STRING
  if (!connectionString) {
    throw new InternalError("Env variable 'MAIN_DB_CONNECTION_STRING' is required")
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
