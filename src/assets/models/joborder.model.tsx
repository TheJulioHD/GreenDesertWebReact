import { IInventory } from "./inventory.model";

export interface Ijobordermodel{
    quantity: number;
    customer: number;
    employee: number;
    status: boolean;
    inventory: IInventory;
    product?: number;
}