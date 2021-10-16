export interface iMyMeal {
    id: number,
    mess_id: number,
    month_id: number,
    mem_id: string,
    mem_name: string,
    mem_token: string,
    amount: number,
    created_at: string,
    pending: boolean
}

const MyMeal = (obj: iMyMeal) => {
    return obj
}

export default MyMeal