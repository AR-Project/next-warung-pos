import { container } from "tsyringe";
import db from "./database/orm/db";

import idGenerator from "./utils/nanoid";
import PasswordHashImplementation from "./utils/bcrypt";
import LevelCheckConcrete from "./utils/roleCheck";

import UserRepository from "./repository/UserRepository";
import StoreRepository from "./repository/StoreRepository";

// Utils Implementations
container.register("db", { useValue: db });
container.register("idGenerator", { useValue: idGenerator });
container.register("IRoleCheck", { useClass: LevelCheckConcrete });
container.register("IPasswordHash", { useClass: PasswordHashImplementation });

// Repository Implementation
container.register("IUserRepository", { useClass: UserRepository });
container.register("IStoreRepository", { useClass: StoreRepository });

export default container;
