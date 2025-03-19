package main

import (
    "log"
    "usermanagement/routes"
    "usermanagement/services"

    "github.com/gin-gonic/gin"
    "github.com/jmoiron/sqlx"
    _ "github.com/lib/pq"
)

func main() {
    db, err := sqlx.Connect("postgres", "user=youruser dbname=yourdb sslmode=disable")
    if err != nil {
        log.Fatalln(err)
    }
    services.InitDB(db)

    router := gin.Default()
    routes.SetupRoutes(router)
    router.Run(":8080")
}
