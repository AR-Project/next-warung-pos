import { container } from "tsyringe";
import db from "./database/orm/db";
import idGenerator from "./utils/nanoid";
import UserRepository from "./repository/UserRepository";
import PasswordHashImplementation from "./utils/bcrypt";
import LevelCheckConcrete from "./utils/roleCheck";

container.register("db", { useValue: db });
container.register("idGenerator", { useValue: idGenerator });
container.register("IRoleCheck", { useClass: LevelCheckConcrete });
container.register("IPasswordHash", { useClass: PasswordHashImplementation });

container.register("IUserRepository", { useClass: UserRepository });

export default container;
