package controllers

import (
    "net/http"
    "usermanagement/models"
    "usermanagement/services"

    "github.com/gin-gonic/gin"
)

func GetUsers(c *gin.Context) {
    users, err := services.GetUsers()
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    c.JSON(http.StatusOK, users)
}

func CreateUser(c *gin.Context) {
    var user models.User
    if err := c.ShouldBindJSON(&user); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
    if err := services.CreateUser(user); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
    c.JSON(http.StatusOK, user)
}
