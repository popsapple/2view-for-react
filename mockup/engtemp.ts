import { createServer } from "miragejs";

export const getUsers = (users: {uid: string}[]) => {
    createServer({
        routes() {
            this.get("/api/users", () => users)
        },
    })
}
