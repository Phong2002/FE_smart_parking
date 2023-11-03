import { useEffect, useState } from "react"
import UserService from "../../infrastructure/UserService"

export default function MonthlyPassManagement() {


    const isAdmin = () => {
        if (UserService.isAdmin()) {
        }
        else (
            navigate('..')
        )
    }
    useEffect(isAdmin, [])

    return (
        <div className="flex items-center m-20 justify-center">
                
        </div>
    )
}
