function getDocs(req, res) {
    const docs = {
        "GET /users": {
            "description": "Fetch all users",
            "parameters": "None",
        },
        "GET /users/:id": {
            "description": "Fetch a user by ID",
            "parameters": "id",
            "example": "/users/12345",
        },
        "POST /users": {
            "description": "Create a new user",
            "parameters": "firstName, lastName, email, password, isAdmin (in the request body)"
        },
        "PUT /users/:id": {
            "description": "Update a user by ID",
            "parameters": "id (in the URL), firstName, lastName, email, password, isAdmin (in the request body)",
            "example": "/users/12344",
        },
        "PATCH /users/:id": {
            "description": "Partially update a user by ID",
            "parameters": "id (in the URL), firstName, lastName, email, password, isAdmin (in the request body, all optional)",
            "example": "/users/1234",
        },
        "DELETE /users/:id": {
            "description": "Delete a user by ID",
            "parameters": "id",
            "example": "/users/12345",
        }
    };
    res.json(docs);
}

module.exports = getDocs;