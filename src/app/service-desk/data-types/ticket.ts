export interface Ticket {
    uid: string,
    type: string,
    typeName: string,
    controlNo: string,
    title: string,
    description: string,
    requestedTime: Date,
    resolutionTime: Date,
    customerName: string,
    status: string
}