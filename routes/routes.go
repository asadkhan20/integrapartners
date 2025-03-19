package routes

import (
    "usermanagement/controllers"
    "github.com/gin-gonic/gin"
)

func SetupRoutes(router *gin.Engine) {
    router.GET("/users", controllers.GetUsers)
    router.POST("/users", controllers.CreateUser)
    // Add routes for update and delete...
}
