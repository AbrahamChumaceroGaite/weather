export interface Client {
    id: number;
    iduser: number;
    idperson: number,
    user: string;
    location: string,
    createdAt: Date,
    createdUpd: Date
};

export interface ClientCommunity {
    idClient: number,
    idCommu: number,
    createdAt: string
}