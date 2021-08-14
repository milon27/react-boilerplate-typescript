class User {
    id: number
    name = ""
    email = ""
    is_admin = false
    constructor(id: number, name: string, email: string, is_admin = false) {
        this.id = id
        this.name = name
        this.email = email
        this.is_admin = is_admin
    }
}
export default User