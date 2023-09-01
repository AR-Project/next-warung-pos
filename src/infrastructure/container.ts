import { container } from "tsyringe";
import db from "./database/orm/db";
import idGenerator from "./utils/nanoid";
import UserRepository from "./repository/UserRepository";

container.register("db", { useValue: db });
container.register("idGenerator", { useValue: idGenerator });
container.register("IUserRepository", { useClass: UserRepository });

export default container;
