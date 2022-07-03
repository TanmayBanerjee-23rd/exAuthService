export interface iUserEntity {
    id?: number,
    firstName: string,
    middleName: string,
    lastName: string,
    email: string,
    password: string,
    phoneNumber: number,
    userType: "admin" | "normalUser"
};