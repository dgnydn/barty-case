import { GeoPoint, PrismaClient } from "@prisma/client";
import type TUser from "../types/user.type";

export default class User {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  /**
   * Get all users
   *
   * @async
   * @returns {Promise<TUser[]>}
   */
  async all(): Promise<TUser[]> {
    return await this.prisma.user.findMany();
  }

  /**
   * Create a new user
   *
   * @async
   * @param {TUser} data
   * @returns {Promise<TUser>}
   */
  async create(data: TUser): Promise<TUser> {
    try {
      const ret = await this.prisma.user.create({
        data: {
          username: data.username,
          email: data.email,
          password: data.password!,
          name: data.name,
          surname: data.surname,
          age: data.age,
          bornAt: data.bornAt,
          location: data.location,
          about: data.about,
          image: data.image,
          balance: data.balance,
          phoneNumber: data.phoneNumber,
        },
      });
      return ret;
    } catch (error) {
      console.log(error);
    }
    return {} as TUser;
  }

  /**
   * Update a user with the given id
   *
   * @async
   * @param {string} id
   * @param {TUser} data
   * @returns {Promise<TUser>}
   */
  async update(id: string, data: TUser): Promise<TUser> {
    try {
      this.prisma.$transaction(async ($prisma) => {
        $prisma.$runCommandRaw({
          update: "user",
          updates: [
            {
              q: { id: id },
              multi: false,
              upsert: false,
              u: {
                $set: {
                  username: data.username,
                  email: data.email,
                  password: data.password!,
                  name: data.name,
                  about: data.about,
                  surname: data.surname,
                  age: data.age as number,
                  balance: data.balance,
                  bornAt: `${new Date(data.bornAt!)}`,
                  image: data.image,
                  location: {
                    type: "Point",
                    coordinates: [
                      data.location!.split(",")[0] as number,
                      data.location!.split(",")[1] as number,
                    ],
                  },
                  phoneNumber: data.phoneNumber,
                },
              },
            },
          ],
        });
      });
      return data;
    } catch (error) {
      console.log(error);
      return {} as TUser;
    }
  }

  /**
   * Delete a user with the given id
   *
   * @async
   * @param {string} id
   * @returns {Promise<TUser>}
   */
  async delete(id: string): Promise<TUser> {
    return await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }

  /**
   * Find a user by email
   *
   * @async
   * @param {string} email
   * @returns {(Promise<TUser | null>)}
   */
  async findUserByEmail(email: string): Promise<TUser | null> {
    return await this.prisma.user.findFirst({
      where: {
        email,
      },
    });
  }

  /**
   * Find a user by id
   *
   * @async
   * @param {string} id
   * @returns {(Promise<TUser | null>)}
   */
  async findUserById(id: string): Promise<TUser | null> {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  /**
   * Find a user by username
   *
   * @async
   * @param {string} username
   * @returns {(Promise<TUser | null>)}
   */
  async findUserByUsername(username: string): Promise<TUser | null> {
    return await this.prisma.user.findUnique({
      where: {
        username,
      },
    });
  }

  /**
   * Find a user by phone number
   *
   * @async
   * @param {string} phoneNumber
   * @returns {(Promise<TUser | null>)}
   */
  async findUserByPhoneNumber(phoneNumber: string): Promise<TUser | null> {
    return await this.prisma.user.findUnique({
      where: {
        phoneNumber,
      },
    });
  }

  /**
   * Find users by name
   *
   * @async
   * @param {string} name
   * @returns {Promise<TUser[]>}
   */
  async findUsersByName(name: string): Promise<TUser[]> {
    return await this.prisma.user.findMany({
      where: {
        name: {
          contains: name,
        },
      },
    });
  }

  /**
   * Find users by surname
   *
   * @async
   * @param {string} surname
   * @returns {Promise<TUser[]>}
   */
  async findUsersBySurname(surname: string): Promise<TUser[]> {
    return await this.prisma.user.findMany({
      where: {
        surname: {
          contains: surname,
        },
      },
    });
  }

  /**
   * Find users by age
   *
   * @async
   * @param {number} age
   * @returns {Promise<TUser[]>}
   */
  async findUsersByAge(age: number): Promise<TUser[]> {
    return await this.prisma.user.findMany({
      where: {
        age,
      },
    });
  }

  /**
   * Find users by location
   *
   * @async
   * @param {number} lat
   * @param {number} lng
   * @returns {Promise<TUser[]>}
   */
  async findUsersByLocation(lng: number, lat: number): Promise<TUser[]> {
    return await this.prisma.user.findMany({
      where: {
        location: {
          // @ts-ignore
          type: "Point",
          coordinates: [lng, lat] as any,
        },
      },
    });
  }

  /**
   * Find users by location and radius
   *
   * @async
   * @param {number} lng
   * @param {number} lat
   * @param {number} radius
   * @returns {Promise<TUser[]>}
   */
  async findUsersByLocationRadius(
    lng: number,
    lat: number,
    radius: number
  ): Promise<TUser[]> {
    return (await this.prisma.user.findRaw({
      filter: {
        location: {
          $near: {
            $geometry: {
              coordinates: [lng, lat] as any,
            },
            $maxDistance: radius,
            $minDistance: 0,
          },
        },
      },
    })) as unknown as TUser[];
  }

  /**
   * Find users by birth date
   *
   * @async
   * @param {Date} bornAt
   * @returns {Promise<TUser[]>}
   */
  async findUsersByBirthDate(bornAt: Date): Promise<TUser[]> {
    return await this.prisma.user.findMany({
      where: {
        bornAt,
      },
    });
  }

  /**
   * Find users by about
   *
   * @async
   * @param {string} about
   * @returns {Promise<TUser[]>}
   */
  async findUsersByAbout(about: string): Promise<TUser[]> {
    return await this.prisma.user.findMany({
      where: {
        about: {
          contains: about,
        },
      },
    });
  }

  /**
   * Find users by balance
   *
   * @async
   * @param {number} balance
   * @returns {Promise<TUser[]>}
   */
  async findUsersByBalance(balance: number): Promise<TUser[]> {
    return await this.prisma.user.findMany({
      where: {
        balance,
      },
    });
  }
}
