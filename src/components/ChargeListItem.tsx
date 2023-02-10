import React from "react"
import { Charge } from "@components/db/models/charge"

interface ChargeListItemProps {
    charge: Charge,
    onRefund: (chargeId: string) => void
}

export const ChargeListItem: React.FC<ChargeListItemProps> = ({ charge, onRefund }) => (
    <li key={charge.chargeID}>
        <h2>{charge.chargeID}</h2>
        <table>
            <tbody>
                <tr>
                    <td>customerID</td>
                    <td>{charge.customerID}</td>
                </tr>
                <tr>
                    <td>amount</td>
                    {/* TODO just rendering £. will need better rendering */}
                    <td>£{charge.amount / 100}</td>
                </tr>
                <tr>
                    <td>currency</td>
                    <td>{charge.currency}</td>
                </tr>
                <tr>
                    <td>created</td>
                    <td>{new Date(charge.created * 1000).toLocaleString()}</td>
                </tr>
            </tbody>
        </table>
        <p>{charge.refunded && "This Charge has been refunded"}</p>
        {!charge.refunded && (
            <button
                onClick={() => onRefund(charge.chargeID)}
            >
                Refund
            </button>
        )}
    </li>
)