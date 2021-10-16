export interface iMyMember {
    id: number
    mem_id: string,
    mess_id: number,
    active_month: number,
    mem_name: string,
    mem_display_pic: string,
    mem_email: string,
    phone_num: string,
    mem_token: string,
    mem_pass: string,
    mem_h_pass: string,
    mem_bazar_day: string,//["1","2"]
    mem_institution_name: string,
    mem_address: string,
    mem_gender: "Male" | "Female" | "NOT_SET_YET",
    mem_last_login: Date,
    version: string,
    is_email_verified: boolean,
    created_at: Date,
    total_img_post: number,
    total_tolet_post: number,
    total_buysell_post: number,
    mem_location: string,
    mem_total_coins: number,
    mem_pro_expire_day: Date
}

const MyMember = ({ mem_gender = "NOT_SET_YET", ...object }: iMyMember): iMyMember => {
    return { ...object, mem_gender }
}

export default MyMember