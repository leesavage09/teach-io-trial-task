import mongoose from "mongoose"

export type Charge = {
    chargeID: string;
    customerID: string;
    amount: number;
    currency: string;
    created: number;
    refunded: boolean;
}

const chargeSchema = new mongoose.Schema<Charge>({
    chargeID: {
        type: String,
        required: true
    },
    customerID: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    created: {
        type: Number,
        required: true
    },
    refunded: {
        type: Boolean,
        required: true
    },
})

export const ChargeModel = mongoose.models.Charge as mongoose.Model<Charge> || mongoose.model<Charge>("Charge", chargeSchema) 
