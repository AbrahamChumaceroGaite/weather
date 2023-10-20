export interface Client {
    id: number;
    name: string,
    pass: string,
    ci: number,
    idrol: number,
    rol: string,
    idlocation: number,
    location: string,
    number: number
    createdAt: string
};

export interface ClientCommunity {
    idClient: number,
    idCommu: number,
    createdAt: string
}