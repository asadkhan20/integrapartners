package models

type User struct {
    ID       int    `db:"user_id" json:"user_id"`
    Username string `db:"user_name" json:"user_name" binding:"required"`
	Firstname string `db:"first_name" json:"first_name" binding:"required"`
	Lastname string `db:"last_name" json:"last_name" binding:"required"`
    Email    string `db:"email" json:"email" binding:"required,email"`
	Userstatus string `db:"user_status" json:"user_status" binding:"required"`
	Department string `db:"department" json:"department"`
}
