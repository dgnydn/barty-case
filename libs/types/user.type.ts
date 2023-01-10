/**
 * User type
 * @typedef {TUser}
 * @property {string} id
 * @property {string} email
 * @property {string} name
 * @property {string} surname
 * @property {string} username
 * @property {number|null} age
 * @property {Date|null} bornAt
 * @property {TGeoPoint|null} location
 * @property {string|null} about
 * @property {string|null} image
 * @property {number} balance
 * @property {string} password
 * @property {string|null} phoneNumber
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */
type TUser = {
  id?: string;
  email: string;
  name: string;
  surname: string;
  username: string;
  age: number | null;
  bornAt: Date | null;
  location: TGeoPoint;
  about: string | null;
  image: string | null;
  balance: number;
  password?: string;
  phoneNumber: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type TGeoPoint =
  | {
      type: "Point";
      coordinates: [number, number];
    }
  | any;

export default TUser;
