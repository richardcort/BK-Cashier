import { db, sequelize, UserDB } from "../config";
import { UserInterface } from "../interfaces";

export const getAll = async () => {
  try {
    const [users, metadata] = await db.query('SELECT * FROM Users WHERE status = 1');

    if (users.length == 0) {
      return {
        message: `No hay usuarios encontrados`,
        status: 200,
        data: {
          users,
        },
      };
    }

    return {
      message: `Usuarios encontrados exitosamente`,
      status: 200,
      data: {
        users,
      },
    };

  } catch (error) {
    console.log(error);
    return {
      message: `Contact the administrator: error`,
      status: 500,
    };
  }
};

export const getOne = async (id: number) => {
  try {
    const [user] = await db.query('SELECT * FROM Users WHERE id = ?', {
      replacements: [id],
      type: sequelize.QueryTypes.SELECT,
    });

    if (!user) {
      console.log("No encontrado");
      return {
        message: `Usuario no encontrado`,
        status: 404,
        data: {},
      };
    }

    return {
      message: `Usuario encontrado`,
      status: 200,
      data: {
        user,
      },
    };

  } catch (error) {
    console.log(error);
    return {
      message: `Contact the administrator: error`,
      status: 500,
    };
  }
};

export const create = async (data: UserInterface) => {
  try {
    const [results, metadata] = await db.query(
      'INSERT INTO users (nombre, apellido, usuario, clave, rol_id, createdAt, updatedAt, deletedAt, status) VALUES (:nombre, :apellido, :usuario, :clave, :rol_id, :createdAt, :updatedAt, :deletedAt, :status)',
      {
        replacements: {
          nombre: data.nombre,
          apellido: data.apellido,
          usuario: data.usuario,
          clave: data.clave,
          rol_id: data.rol_id,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
          status: true,
        },
        type: sequelize.QueryTypes.INSERT,
      }
    );

    const newUserId = results; // Assuming `results` contains the ID of the new user

    return {
      message: `Creación del usuario exitosa`,
      status: 200,
      data: {
        newUserId,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      message: `Contact the administrator: error`,
      status: 500,
    };
  }
};

export const update = async (id: number, data: UserInterface) => {
  try {
    const [updatedRows] : any = await db.query(
      `UPDATE users 
        SET nombre = :nombre, 
            apellido = :apellido, 
            usuario = :usuario,
            clave = :clave, 
            rol_id = :rol_id, 
            updatedAt = :updatedAt,
            status = :status
        WHERE id = :id`,
      {
        replacements: {
          id: id,
          nombre: data.nombre,
          apellido: data.apellido,
          usuario: data.usuario,
          clave: data.clave,
          rol_id: data.rol_id,
          updatedAt: new Date(),
          status: true,
        },
        type: sequelize.QueryTypes.UPDATE,
      }
    );

    return {
      message: `Actualización del usuario exitosa`,
      status: 200,
      data: {
          id: id,
          nombre: data.nombre,
          apellido: data.apellido,
          usuario: data.usuario,
          clave: data.clave,
          rol_id: data.rol_id,
          updatedAt: new Date(),
      },
    };

  } catch (error) {
    console.log(error);
    return {
      message: `Contact the administrator: error`,
      status: 500,
    };
  }
};

export const deleted = async (id: number, data: UserInterface) => {
  try {
    await db.query(
      `UPDATE Users SET status = false, deletedAt = :deletedAt WHERE id = :id`,
      {
        replacements: { id, deletedAt: new Date() },
        type: sequelize.QueryTypes.UPDATE,
      }
    );

    return {
      message: `Eliminación del usuario exitosa`,
      status: 200,
      data: {
        id,
        status: false,
        deletedAt: new Date(),
      },
    };
  } catch (error) {
    console.log(error);
    return {
      message: `Contact the administrator: error`,
      status: 500,
    };
  }
};

export const getByEmail = async (data: UserInterface) => {
  /*
  try {
    //consultas a la base de datos van aca
    const user:UserInterface|any = await UserDB.findOne({ where: { email:data.email } })
    if (!user) {
      return {
        message: `Usuario no encontrado`,
        status: 404,
        data: {
          user
        },
      };
    } else {
      return {
        message: `Usuario encontrado`,
        status: 200,
        data: {
          user,
        },
      };
    }
  } catch (error) {
    console.log(error);
    return {
      message: `Contact the administrator: error`,
      status: 500,
    };
  }
  */
};
